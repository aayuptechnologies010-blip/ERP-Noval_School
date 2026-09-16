import React, { useState, useEffect } from 'react';
import { Eye, Plus, Trash2, X, Search, Download, Printer, CheckCircle, AlertCircle, RefreshCw, Calendar, Sparkles, ShieldCheck, DollarSign, Users, Edit } from 'lucide-react';
const DEFAULT_MONTHS = [
  'April-2026', 'May-2026', 'June-2026', 'July-2026', 'August-2026',
  'September-2026', 'October-2026', 'November-2026', 'December-2026',
  'January-2027', 'February-2027', 'March-2027'
];


const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function RelatedPoliciesWithMonth() {
  const [monthOptions, setMonthOptions] = useState(DEFAULT_MONTHS);
  const [selectedMonth, setSelectedMonth] = useState('September-2026');
  const [deductions, setDeductions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Table search & filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modals
  const [confirmGenerateOpen, setConfirmGenerateOpen] = useState(false);
  const [confirmDeleteAllOpen, setConfirmDeleteAllOpen] = useState(false);
  const [deleteSingleId, setDeleteSingleId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  // Toast Notifications
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

  // 1. Fetch Month Options
  const fetchMonthOptions = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/salary-months`, { headers });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const list = data.map(m => `${m.month}-${m.year}`);
          const combined = Array.from(new Set([...list, ...DEFAULT_MONTHS]));
          setMonthOptions(combined);
        }
      }
    } catch (err) {
      console.error('Error fetching salary months:', err);
    }
  };

  // 2. Fetch Deductions for Selected Month
  const fetchDeductions = async (targetMonth = selectedMonth) => {
    if (!targetMonth) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/monthly-insurance-deductions?monthYear=${encodeURIComponent(targetMonth)}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setDeductions(Array.isArray(data) ? data : []);
      } else {
        showNotification('error', `Failed to load deductions for ${targetMonth}`);
      }
    } catch (err) {
      console.error('Error fetching monthly deductions:', err);
      showNotification('error', 'Server error loading monthly deductions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthOptions();
    fetchDeductions('September-2026');
  }, []);

  // Action: View
  const handleView = () => {
    if (!selectedMonth) {
      showNotification('error', 'Please select a Month-Year');
      return;
    }
    fetchDeductions(selectedMonth);
    showNotification('success', `Loaded deductions for ${selectedMonth}`);
  };

  // Action: Create / Generate
  const handleGenerate = async () => {
    if (!selectedMonth) {
      showNotification('error', 'Please select a Month-Year');
      return;
    }
    try {
      setGenerating(true);
      const res = await fetch(`${API_BASE}/api/monthly-insurance-deductions/generate`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ monthYear: selectedMonth })
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', data.message || `Successfully generated deductions for ${selectedMonth}`);
        setConfirmGenerateOpen(false);
        fetchDeductions(selectedMonth);
      } else {
        showNotification('error', data.message || 'Generation failed');
      }
    } catch (err) {
      console.error('Error generating deductions:', err);
      showNotification('error', 'Server error while generating deductions');
    } finally {
      setGenerating(false);
    }
  };

  // Action: Delete All for Month
  const handleDeleteAll = async () => {
    if (!selectedMonth) {
      showNotification('error', 'Please select a Month-Year');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/monthly-insurance-deductions?monthYear=${encodeURIComponent(selectedMonth)}`, {
        method: 'DELETE',
        headers
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', data.message || `Cleared all deductions for ${selectedMonth}`);
        setConfirmDeleteAllOpen(false);
        fetchDeductions(selectedMonth);
      } else {
        showNotification('error', data.message || 'Failed to delete deductions');
      }
    } catch (err) {
      console.error('Error deleting monthly deductions:', err);
      showNotification('error', 'Server error while deleting deductions');
    }
  };

  // Action: Delete Single Deduction
  const handleDeleteSingle = async () => {
    if (!deleteSingleId) return;
    try {
      const res = await fetch(`${API_BASE}/api/monthly-insurance-deductions/${deleteSingleId}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        showNotification('success', 'Deduction record removed');
        setDeleteSingleId(null);
        fetchDeductions(selectedMonth);
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to remove deduction');
      }
    } catch (err) {
      console.error('Error deleting deduction:', err);
      showNotification('error', 'Server error deleting deduction');
    }
  };

  // Action: Update Single Deduction
  const handleUpdateSingle = async (e) => {
    e.preventDefault();
    if (!editingItem) return;
    try {
      const res = await fetch(`${API_BASE}/api/monthly-insurance-deductions/${editingItem._id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          premiumAmount: editingItem.premiumAmount,
          status: editingItem.status,
          remarks: editingItem.remarks
        })
      });
      if (res.ok) {
        showNotification('success', 'Deduction updated successfully');
        setEditingItem(null);
        fetchDeductions(selectedMonth);
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to update deduction');
      }
    } catch (err) {
      console.error('Error updating deduction:', err);
      showNotification('error', 'Server error updating deduction');
    }
  };

  // Action: Reset
  const handleReset = () => {
    setSelectedMonth('September-2026');
    setSearchTerm('');
    setFilterStatus('All');
    fetchDeductions('September-2026');
    showNotification('success', 'Reset to September-2026');
  };

  // Export CSV
  const handleExportCSV = () => {
    if (deductions.length === 0) {
      showNotification('error', 'No deduction records to export');
      return;
    }
    const headersList = ['Staff ID', 'Employee Name', 'Vendor Name', 'Policy No', 'Policy Name', 'Monthly Premium', 'Month-Year', 'Status', 'Remarks'];
    const rows = filteredDeductions.map(d => [
      `"${d.empNo || ''}"`,
      `"${d.staffName || ''}"`,
      `"${d.vendorName || ''}"`,
      `"${d.policyNo || ''}"`,
      `"${d.policyName || ''}"`,
      d.premiumAmount || 0,
      `"${d.monthYear || selectedMonth}"`,
      `"${d.status || 'Scheduled'}"`,
      `"${d.remarks || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersList.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Insurance_Deductions_${selectedMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('success', `Exported deductions for ${selectedMonth} to CSV`);
  };

  // Print Window
  const handlePrint = () => {
    window.print();
  };

  // Filter & Search
  const filteredDeductions = deductions.filter(d => {
    if (filterStatus !== 'All' && d.status !== filterStatus) return false;
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (d.staffName && d.staffName.toLowerCase().includes(term)) ||
      (d.empNo && d.empNo.toLowerCase().includes(term)) ||
      (d.policyNo && d.policyNo.toLowerCase().includes(term)) ||
      (d.policyName && d.policyName.toLowerCase().includes(term)) ||
      (d.vendorName && d.vendorName.toLowerCase().includes(term))
    );
  });

  // KPIs
  const totalRecords = filteredDeductions.length;
  const totalAmount = filteredDeductions.reduce((sum, d) => sum + (Number(d.premiumAmount) || 0), 0);
  const scheduledCount = filteredDeductions.filter(d => d.status === 'Scheduled').length;
  const processedCount = filteredDeductions.filter(d => d.status === 'Processed').length;
  const uniqueStaff = new Set(filteredDeductions.map(d => d.staffId || d.empNo)).size;

  // Pagination
  const totalPages = Math.ceil(filteredDeductions.length / pageSize) || 1;
  const paginatedDeductions = filteredDeductions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="global-settings-container" style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
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

      {/* Breadcrumb & Header Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Payroll Master</span>
            <span>/</span>
            <span>Insurance</span>
            <span>/</span>
            <span style={{ color: '#159BD7', fontWeight: '600' }}>Related Policies With Month</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={26} color="#159BD7" />
            Related Policies With Month
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => fetchDeductions(selectedMonth)}
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
        </div>
      </div>

      {/* Top Filter & Action Bar Card */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        padding: '24px',
        border: '1px solid #e2e8f0',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        maxWidth: '800px',
        margin: '0 auto 24px'
      }}>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px', display: 'block' }}>
            Salary Month - Year *
          </label>
          <div style={{ position: 'relative' }}>
            <select 
              className="settings-input"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '14px',
                fontWeight: '600',
                color: '#0f172a',
                backgroundColor: '#ffffff'
              }}
            >
              {monthOptions.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
            Select salary month to view, generate, or manage monthly policy deductions for employees.
          </div>
        </div>

        {/* 4 Action Buttons as in original layout */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            onClick={handleView}
            style={{
              backgroundColor: '#ffffff',
              color: '#159BD7',
              border: '1px solid #159BD7',
              padding: '8px 24px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px',
              transition: 'all 0.15s ease'
            }}
          >
            <Eye size={16} /> View
          </button>

          <button 
            onClick={() => setConfirmGenerateOpen(true)}
            style={{
              backgroundColor: '#159BD7',
              color: '#ffffff',
              border: '1px solid #159BD7',
              padding: '8px 24px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px',
              boxShadow: '0 2px 4px rgba(21, 155, 215, 0.2)'
            }}
          >
            <Plus size={16} /> Create / Generate
          </button>

          <button 
            onClick={() => setConfirmDeleteAllOpen(true)}
            style={{
              backgroundColor: '#ffffff',
              color: '#dc3545',
              border: '1px solid #dc3545',
              padding: '8px 24px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px'
            }}
          >
            <Trash2 size={16} /> Delete Month Records
          </button>

          <button 
            onClick={handleReset}
            style={{
              backgroundColor: '#ffffff',
              color: '#ff9800',
              border: '1px solid #ff9800',
              padding: '8px 24px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px'
            }}
          >
            <X size={16} /> Reset
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Active Monthly Deductions</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginTop: '6px' }}>{totalRecords}</div>
          <div style={{ fontSize: '12px', color: '#159BD7', marginTop: '4px' }}>For {selectedMonth}</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Total Deductible Premium</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#059669', marginTop: '6px' }}>
            ₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>To be deducted from payroll</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Participating Employees</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#159BD7', marginTop: '6px' }}>{uniqueStaff}</div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Staff members enrolled</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Scheduled / Processed</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#8b5cf6', marginTop: '6px' }}>
            {scheduledCount} / {processedCount}
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Ready for payroll calculation</div>
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
        {/* Table Search & Toolbar */}
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
            <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
              <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search staff, policy no, vendor..."
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
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
              style={{ padding: '7px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
            >
              <option value="All">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Processed">Processed</option>
              <option value="Skipped">Skipped</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handlePrint}
              style={{
                padding: '7px 14px',
                backgroundColor: '#ffffff',
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
              <Printer size={15} /> Print
            </button>
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
              <Download size={15} /> Export CSV
            </button>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
              style={{ padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
            >
              <option value={10}>10 / page</option>
              <option value={25}>25 / page</option>
              <option value={50}>50 / page</option>
            </select>
          </div>
        </div>

        {/* Deductions Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>
                <th style={{ padding: '12px 16px', width: '50px' }}>#</th>
                <th style={{ padding: '12px 16px' }}>Staff ID</th>
                <th style={{ padding: '12px 16px' }}>Employee Name</th>
                <th style={{ padding: '12px 16px' }}>Insurance Vendor</th>
                <th style={{ padding: '12px 16px' }}>Policy No & Scheme</th>
                <th style={{ padding: '12px 16px' }}>Premium (₹)</th>
                <th style={{ padding: '12px 16px' }}>Month-Year</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '12px 16px' }}>Remarks</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} style={{ padding: '36px', textAlign: 'center', color: '#64748b' }}>
                    <RefreshCw size={24} className="spin" style={{ margin: '0 auto 8px', display: 'block', animation: 'spin 1s linear infinite' }} />
                    Loading monthly insurance deductions...
                  </td>
                </tr>
              ) : paginatedDeductions.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                    <Calendar size={36} style={{ margin: '0 auto 10px', color: '#cbd5e1' }} />
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#475569' }}>No Deductions Found for {selectedMonth}</div>
                    <div style={{ fontSize: '13px', marginTop: '4px' }}>Click "Create / Generate" above to generate monthly deductions from active employee policies.</div>
                  </td>
                </tr>
              ) : (
                paginatedDeductions.map((d, idx) => {
                  const isAyup = d.staffName && d.staffName.toLowerCase().includes('ayup');
                  return (
                    <tr 
                      key={d._id} 
                      style={{ 
                        borderBottom: '1px solid #f1f5f9', 
                        backgroundColor: isAyup ? '#f0fdf4' : (idx % 2 === 0 ? '#ffffff' : '#fcfcfd')
                      }}
                    >
                      <td style={{ padding: '12px 16px', color: '#64748b', fontWeight: '500' }}>
                        {(currentPage - 1) * pageSize + idx + 1}
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: '600', color: '#1e293b' }}>
                        <span style={{ backgroundColor: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
                          {d.empNo || 'N/A'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '600', color: '#0f172a' }}>{d.staffName}</span>
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
                              <Sparkles size={11} /> AYUP TECH
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#334155', fontWeight: '500' }}>
                        {d.vendorName}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: '600', color: '#159BD7' }}>{d.policyNo}</div>
                        {d.policyName && <div style={{ fontSize: '12px', color: '#64748b' }}>{d.policyName}</div>}
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: '700', color: '#0f172a' }}>
                        ₹{Number(d.premiumAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#475569', fontWeight: '500' }}>
                        {d.monthYear || selectedMonth}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span style={{
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '600',
                          backgroundColor: d.status === 'Processed' ? '#dcfce7' : (d.status === 'Scheduled' ? '#e0f2fe' : '#fef3c7'),
                          color: d.status === 'Processed' ? '#166534' : (d.status === 'Scheduled' ? '#0369a1' : '#b45309')
                        }}>
                          {d.status || 'Scheduled'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '12px' }}>
                        {d.remarks || '-'}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                          <button
                            onClick={() => setEditingItem({ ...d })}
                            title="Edit Deduction"
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
                            onClick={() => setDeleteSingleId(d._id)}
                            title="Remove Deduction"
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
            Showing {filteredDeductions.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, filteredDeductions.length)} of {filteredDeductions.length} entries
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

      {/* Modal: Confirm Generate Deductions */}
      {confirmGenerateOpen && (
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
            maxWidth: '450px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            textAlign: 'center'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e0f2fe', color: '#159BD7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Calendar size={24} />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Generate Monthly Deductions</h3>
            <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
              Generate insurance premium deductions for <strong>{selectedMonth}</strong> from all active employee policies? Any existing deductions for this month will be refreshed.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                onClick={() => setConfirmGenerateOpen(false)}
                style={{ padding: '8px 18px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '13px' }}
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                disabled={generating}
                style={{ padding: '8px 22px', backgroundColor: '#159BD7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: generating ? 'not-allowed' : 'pointer', fontSize: '13px' }}
              >
                {generating ? 'Generating...' : 'Yes, Generate'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Confirm Delete All For Month */}
      {confirmDeleteAllOpen && (
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
            maxWidth: '440px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            textAlign: 'center'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Trash2 size={24} />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Clear Monthly Deductions</h3>
            <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
              Are you sure you want to delete all insurance deductions for <strong>{selectedMonth}</strong>? This cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                onClick={() => setConfirmDeleteAllOpen(false)}
                style={{ padding: '8px 18px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '13px' }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAll}
                style={{ padding: '8px 22px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
              >
                Yes, Delete All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Delete Single Deduction */}
      {deleteSingleId && (
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
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Remove Deduction</h3>
            <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
              Are you sure you want to remove this employee deduction record?
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                onClick={() => setDeleteSingleId(null)}
                style={{ padding: '8px 18px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '13px' }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSingle}
                style={{ padding: '8px 20px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Edit Single Deduction */}
      {editingItem && (
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
            maxWidth: '500px',
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
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
                Adjust Monthly Deduction
              </h3>
              <button onClick={() => setEditingItem(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateSingle} style={{ padding: '20px' }}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Employee
                </label>
                <div style={{ padding: '8px 12px', backgroundColor: '#f1f5f9', borderRadius: '6px', fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                  {editingItem.staffName} ({editingItem.empNo || 'N/A'})
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Policy & Vendor
                </label>
                <div style={{ padding: '8px 12px', backgroundColor: '#f1f5f9', borderRadius: '6px', fontSize: '13px', color: '#334155' }}>
                  {editingItem.policyNo} - {editingItem.vendorName}
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Deduction Amount (₹) *
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={editingItem.premiumAmount}
                  onChange={(e) => setEditingItem({ ...editingItem, premiumAmount: e.target.value })}
                  required
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Status
                </label>
                <select
                  value={editingItem.status}
                  onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Processed">Processed</option>
                  <option value="Skipped">Skipped</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Remarks / Notes
                </label>
                <input
                  type="text"
                  value={editingItem.remarks || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, remarks: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  style={{ padding: '8px 18px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '13px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 20px', backgroundColor: '#159BD7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
