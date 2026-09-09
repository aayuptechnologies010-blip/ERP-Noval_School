import React, { useState, useEffect } from 'react';
import { Plus, Download, RefreshCw, Search, Edit, Trash2, CheckCircle, AlertCircle, Sparkles, User, Calendar, CreditCard, DollarSign, X, CheckCircle2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function AdvanceEntry() {
  const [entries, setEntries] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [advanceAccounts, setAdvanceAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDepartment, setFilterDepartment] = useState('All');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    staffId: '',
    staffName: '',
    employeeId: '',
    designation: '',
    department: '',
    staffType: 'Teaching',
    advanceAmount: '',
    date: new Date().toISOString().split('T')[0],
    recoveryMode: 'Monthly Salary Deduction',
    numberOfInstallments: '5',
    monthlyInstallmentAmount: '',
    accountName: 'Ayup Tech Advance Reserve A/c',
    paymentMode: 'Bank Transfer',
    chequeNo: '',
    narration: '',
    status: 'Active'
  });

  // Delete Confirm Modal
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Notification Toast
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

  // Fetch Advance Entries, Staffs, and Accounts
  const fetchData = async () => {
    try {
      setLoading(true);

      // 1. Advance Entries
      const res = await fetch(`${API_BASE}/api/advance/entries`, { headers });
      if (res.ok) {
        const data = await res.json();
        setEntries(Array.isArray(data) ? data : []);
      }

      // 2. Staffs
      const sRes = await fetch(`${API_BASE}/api/staffs`, { headers });
      if (sRes.ok) {
        const sData = await sRes.json();
        setStaffList(Array.isArray(sData) ? sData : []);
      }

      // 3. Advance Accounts
      const aRes = await fetch(`${API_BASE}/api/advance/accounts`, { headers });
      if (aRes.ok) {
        const aData = await aRes.json();
        setAdvanceAccounts(Array.isArray(aData) ? aData : []);
      }
    } catch (err) {
      console.error('Error fetching advance entries:', err);
      showNotification('error', 'Server error loading advance entries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // When staff is picked in dropdown
  const handleStaffSelect = (staffId) => {
    if (staffId === 'ayup_custom') {
      setFormData(prev => ({
        ...prev,
        staffId: '',
        staffName: 'Ayup Tech',
        employeeId: 'EMP-AT-2026',
        designation: 'Senior Fullstack Lead',
        department: 'Information Technology',
        staffType: 'Teaching'
      }));
      return;
    }

    const st = staffList.find(s => s._id === staffId);
    if (st) {
      const name = `${st.basicInfo?.firstName || ''} ${st.basicInfo?.lastName || ''}`.trim() || st.name || 'Staff';
      setFormData(prev => ({
        ...prev,
        staffId: st._id,
        staffName: name,
        employeeId: st.employeeId || 'EMP-001',
        designation: st.designation || st.jobTitle || 'Faculty',
        department: st.department || 'Academics',
        staffType: st.staffType || 'Teaching'
      }));
    }
  };

  // Auto-calculate monthly installment amount
  const handleAmountOrInstallmentChange = (amt, installments) => {
    const total = Number(amt) || 0;
    const count = Number(installments) || 1;
    const monthly = count > 0 ? Math.round(total / count) : total;
    setFormData(prev => ({
      ...prev,
      advanceAmount: amt,
      numberOfInstallments: installments,
      monthlyInstallmentAmount: monthly.toString()
    }));
  };

  // Submit Save/Update
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.staffName.trim()) {
      showNotification('error', 'Please select or enter Staff Name');
      return;
    }
    if (!formData.advanceAmount || Number(formData.advanceAmount) <= 0) {
      showNotification('error', 'Please enter a valid Advance Amount');
      return;
    }

    try {
      setSubmitting(true);
      const url = editingId
        ? `${API_BASE}/api/advance/entries/${editingId}`
        : `${API_BASE}/api/advance/entries`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({
          ...formData,
          advanceAmount: Number(formData.advanceAmount),
          numberOfInstallments: Number(formData.numberOfInstallments) || 1,
          monthlyInstallmentAmount: Number(formData.monthlyInstallmentAmount) || 0
        })
      });

      if (res.ok) {
        showNotification('success', editingId ? 'Advance entry updated successfully!' : 'Advance entry recorded successfully!');
        setIsModalOpen(false);
        setEditingId(null);
        fetchData();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to save advance entry');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Server error while saving');
    } finally {
      setSubmitting(false);
    }
  };

  // Edit
  const handleEdit = (entry) => {
    setEditingId(entry._id);
    setFormData({
      staffId: entry.staffId || '',
      staffName: entry.staffName || '',
      employeeId: entry.employeeId || '',
      designation: entry.designation || '',
      department: entry.department || '',
      staffType: entry.staffType || 'Teaching',
      advanceAmount: entry.advanceAmount || '',
      date: entry.date ? new Date(entry.date).toISOString().split('T')[0] : '',
      recoveryMode: entry.recoveryMode || 'Monthly Salary Deduction',
      numberOfInstallments: entry.numberOfInstallments || '1',
      monthlyInstallmentAmount: entry.monthlyInstallmentAmount || '',
      accountName: entry.accountName || 'Ayup Tech Advance Reserve A/c',
      paymentMode: entry.paymentMode || 'Bank Transfer',
      chequeNo: entry.chequeNo || '',
      narration: entry.narration || '',
      status: entry.status || 'Active'
    });
    setIsModalOpen(true);
  };

  // Delete
  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      const res = await fetch(`${API_BASE}/api/advance/entries/${deleteConfirmId}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        showNotification('success', 'Advance entry and related records deleted');
        setDeleteConfirmId(null);
        fetchData();
      } else {
        showNotification('error', 'Failed to delete advance entry');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Server error during deletion');
    }
  };

  // Export CSV
  const exportCSV = () => {
    if (filteredEntries.length === 0) {
      showNotification('error', 'No entries to export');
      return;
    }
    const headersLine = ['Staff Name', 'Employee ID', 'Designation', 'Department', 'Advance Date', 'Advance Amt (₹)', 'Installments', 'Monthly Amt (₹)', 'Recovered (₹)', 'Left Amt (₹)', 'Account', 'Payment Mode', 'Status', 'Narration'];
    const rows = filteredEntries.map(e => [
      `"${e.staffName || ''}"`,
      `"${e.employeeId || ''}"`,
      `"${e.designation || ''}"`,
      `"${e.department || ''}"`,
      `"${new Date(e.date).toLocaleDateString()}"`,
      e.advanceAmount || 0,
      e.numberOfInstallments || 1,
      e.monthlyInstallmentAmount || 0,
      e.recoveredAmount || 0,
      e.leftAmount || 0,
      `"${e.accountName || ''}"`,
      `"${e.paymentMode || ''}"`,
      `"${e.status || ''}"`,
      `"${(e.narration || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersLine.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Salary_Advance_Entries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('success', 'Advance entries exported to CSV!');
  };

  // Filters
  const filteredEntries = entries.filter(e => {
    const matchesSearch =
      (e.staffName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.employeeId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.narration || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.chequeNo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.accountName || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'All' || e.status === filterStatus;
    const matchesDept = filterDepartment === 'All' || e.department === filterDepartment;

    return matchesSearch && matchesStatus && matchesDept;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEntries.length / pageSize) || 1;
  const paginatedEntries = filteredEntries.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Totals
  const totalDisbursed = entries.reduce((s, e) => s + (e.advanceAmount || 0), 0);
  const totalRecovered = entries.reduce((s, e) => s + (e.recoveredAmount || 0), 0);
  const totalOutstanding = entries.reduce((s, e) => s + (e.leftAmount || 0), 0);
  const activeCount = entries.filter(e => e.status !== 'Fully Recovered').length;

  const departments = Array.from(new Set(entries.map(e => e.department).filter(Boolean)));

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DollarSign size={24} color="#159BD7" /> Advance Entry & Disbursement
          </h2>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>
            Disburse staff salary advances, schedule monthly recovery installments, and track repayment balances
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({
                staffId: '',
                staffName: 'Ayup Tech',
                employeeId: 'EMP-AT-2026',
                designation: 'Senior Fullstack Lead',
                department: 'Information Technology',
                staffType: 'Teaching',
                advanceAmount: '30000',
                date: new Date().toISOString().split('T')[0],
                recoveryMode: 'Monthly Salary Deduction',
                numberOfInstallments: '3',
                monthlyInstallmentAmount: '10000',
                accountName: advanceAccounts[0]?.accountName || 'Ayup Tech Advance Reserve A/c',
                paymentMode: 'Bank Transfer',
                chequeNo: '',
                narration: 'Salary advance for Ayup Tech',
                status: 'Active'
              });
              setIsModalOpen(true);
            }}
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
            <Plus size={16} /> Disburse New Advance
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
            <Download size={16} /> Export CSV
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
            title="Refresh Data"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Total Disbursed</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginTop: '4px' }}>
            ₹{totalDisbursed.toLocaleString('en-IN')}
          </div>
        </div>
        <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #bbf7d0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '12px', color: '#166534', fontWeight: '600', textTransform: 'uppercase' }}>Total Recovered</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#16a34a', marginTop: '4px' }}>
            ₹{totalRecovered.toLocaleString('en-IN')}
          </div>
        </div>
        <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #fed7aa', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '12px', color: '#9a3412', fontWeight: '600', textTransform: 'uppercase' }}>Outstanding Balance</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#ea580c', marginTop: '4px' }}>
            ₹{totalOutstanding.toLocaleString('en-IN')}
          </div>
        </div>
        <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #bae6fd', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '12px', color: '#0369a1', fontWeight: '600', textTransform: 'uppercase' }}>Active Loan Accounts</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#0284c7', marginTop: '4px' }}>
            {activeCount}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ backgroundColor: '#fff', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
        <div style={{ flex: '1 1 240px', position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search staff, emp ID, cheque, account..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '8px 12px 8px 34px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13.5px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ width: '160px' }}>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13.5px', backgroundColor: '#fff' }}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Partially Recovered">Partially Recovered</option>
            <option value="Fully Recovered">Fully Recovered</option>
            <option value="Waived">Waived</option>
          </select>
        </div>

        <div style={{ width: '180px' }}>
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13.5px', backgroundColor: '#fff' }}
          >
            <option value="All">All Departments</option>
            {departments.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setSearchTerm('');
            setFilterStatus('All');
            setFilterDepartment('All');
          }}
          style={{ padding: '8px 16px', border: '1px solid #cbd5e1', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}
        >
          Reset Filters
        </button>
      </div>

      {/* Main Table */}
      <div style={{ backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #cbd5e1', color: '#334155', fontWeight: '600' }}>
                <th style={{ padding: '12px 14px' }}>#</th>
                <th style={{ padding: '12px 14px' }}>Staff Member</th>
                <th style={{ padding: '12px 14px' }}>Disbursed Date</th>
                <th style={{ padding: '12px 14px' }}>Advance Amt</th>
                <th style={{ padding: '12px 14px' }}>Installments</th>
                <th style={{ padding: '12px 14px' }}>Recovered</th>
                <th style={{ padding: '12px 14px' }}>Left Balance</th>
                <th style={{ padding: '12px 14px' }}>Advance Account & Mode</th>
                <th style={{ padding: '12px 14px' }}>Status</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Options</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                      <RefreshCw size={18} className="animate-spin" color="#159BD7" />
                      <span>Loading advance records...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedEntries.length === 0 ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                    No advance entries found matching your search.
                  </td>
                </tr>
              ) : (
                paginatedEntries.map((e, idx) => {
                  const isAyup = (e.staffName || '').toLowerCase().includes('ayup');
                  return (
                    <tr
                      key={e._id}
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
                          {e.staffName}
                          {isAyup && (
                            <span style={{ backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '10.5px', padding: '1px 5px', borderRadius: '4px', fontWeight: '700', border: '1px solid #7dd3fc', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                              <Sparkles size={10} /> Ayup Tech
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                          {e.employeeId ? `ID: ${e.employeeId}` : ''} {e.designation ? `| ${e.designation}` : ''}
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#334155', whiteSpace: 'nowrap' }}>
                        {e.date ? new Date(e.date).toLocaleDateString() : '-'}
                      </td>
                      <td style={{ padding: '12px 14px', fontWeight: '700', color: '#0f172a' }}>
                        ₹{(e.advanceAmount || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>
                        <div>{e.numberOfInstallments} × ₹{(e.monthlyInstallmentAmount || 0).toLocaleString('en-IN')}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{e.recoveryMode}</div>
                      </td>
                      <td style={{ padding: '12px 14px', fontWeight: '600', color: '#16a34a' }}>
                        ₹{(e.recoveredAmount || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', fontWeight: '700', color: e.leftAmount > 0 ? '#ea580c' : '#16a34a' }}>
                        ₹{(e.leftAmount || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', color: '#334155' }}>
                        <div style={{ fontWeight: '500' }}>{e.accountName}</div>
                        <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                          Via: <strong>{e.paymentMode}</strong> {e.chequeNo ? `(${e.chequeNo})` : ''}
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontSize: '11.5px',
                          fontWeight: '600',
                          backgroundColor:
                            e.status === 'Fully Recovered' ? '#dcfce7' :
                            e.status === 'Partially Recovered' ? '#fef9c3' : '#e0f2fe',
                          color:
                            e.status === 'Fully Recovered' ? '#15803d' :
                            e.status === 'Partially Recovered' ? '#854d0e' : '#0369a1',
                          border: `1px solid ${
                            e.status === 'Fully Recovered' ? '#86efac' :
                            e.status === 'Partially Recovered' ? '#fde047' : '#7dd3fc'
                          }`
                        }}>
                          {e.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                          <button
                            onClick={() => handleEdit(e)}
                            style={{ background: 'none', border: 'none', color: '#159BD7', cursor: 'pointer', padding: '4px' }}
                            title="Edit Advance"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(e._id)}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                            title="Delete Advance"
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

        {/* Pagination Footer */}
        <div style={{ padding: '12px 18px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '13px', color: '#64748b' }}>
            Showing {filteredEntries.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredEntries.length)} of {filteredEntries.length} records
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

      {/* Disburse Advance Modal */}
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
            maxWidth: '680px',
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
                {editingId ? 'Edit Salary Advance Record' : 'Disburse New Salary Advance'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Select Staff Member <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    value={formData.staffId || (formData.staffName === 'Ayup Tech' ? 'ayup_custom' : '')}
                    onChange={(e) => handleStaffSelect(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13.5px', backgroundColor: '#fff' }}
                  >
                    <option value="">-- Choose Employee --</option>
                    <option value="ayup_custom">Ayup Tech (EMP-AT-2026) - Senior Fullstack Lead</option>
                    {staffList.map(st => {
                      const name = `${st.basicInfo?.firstName || ''} ${st.basicInfo?.lastName || ''}`.trim() || st.name || 'Staff';
                      return (
                        <option key={st._id} value={st._id}>
                          {name} ({st.employeeId || 'No ID'}) - {st.designation || 'Staff'}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Employee Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.staffName}
                    onChange={(e) => setFormData({ ...formData, staffName: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Advance Amount (₹) <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 50000"
                    value={formData.advanceAmount}
                    onChange={(e) => handleAmountOrInstallmentChange(e.target.value, formData.numberOfInstallments)}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box', fontWeight: '600' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Installments (Months)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.numberOfInstallments}
                    onChange={(e) => handleAmountOrInstallmentChange(formData.advanceAmount, e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Monthly Recovery (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyInstallmentAmount}
                    onChange={(e) => setFormData({ ...formData, monthlyInstallmentAmount: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Disbursement Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Advance A/c Ledger
                  </label>
                  <select
                    value={formData.accountName}
                    onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#fff' }}
                  >
                    {advanceAccounts.map(a => (
                      <option key={a._id} value={a.accountName}>{a.accountName}</option>
                    ))}
                    {advanceAccounts.length === 0 && (
                      <option value="Ayup Tech Advance Reserve A/c">Ayup Tech Advance Reserve A/c</option>
                    )}
                  </select>
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
                    <option value="Bank Transfer">Bank Transfer (NEFT/RTGS/IMPS)</option>
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
                    placeholder="e.g. CHQ-991280 or UTR Number"
                    value={formData.chequeNo}
                    onChange={(e) => setFormData({ ...formData, chequeNo: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                  Narration / Purpose of Advance
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g. Personal loan, medical assistance, tech setup advance for Ayup Tech..."
                  value={formData.narration}
                  onChange={(e) => setFormData({ ...formData, narration: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '8px 18px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    backgroundColor: '#fff',
                    color: '#475569',
                    cursor: 'pointer'
                  }}
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
                  {submitting ? 'Saving...' : editingId ? 'Update Advance' : 'Confirm Disbursement'}
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
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            width: '100%',
            maxWidth: '420px',
            textAlign: 'center'
          }}>
            <AlertCircle size={48} color="#ef4444" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>Confirm Deletion</h3>
            <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '14px' }}>
              Are you sure you want to delete this advance entry? All associated repayment history will also be removed.
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
