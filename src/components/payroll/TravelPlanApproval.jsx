import React, { useState, useEffect } from 'react';
import { Eye, Plus, Search, Download, Trash2, Edit, CheckCircle, XCircle, AlertCircle, RefreshCw, Plane, Calendar, MapPin, DollarSign, Filter, Sparkles, X } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function TravelPlanApproval() {
  const [travelPlans, setTravelPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Filters
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    candidateName: '',
    empNo: '',
    purpose: 'On-site Interview & Demo',
    fromDate: new Date().toISOString().split('T')[0],
    toDate: new Date().toISOString().split('T')[0],
    sourceCity: '',
    destinationCity: '',
    modeOfTravel: 'Train',
    estimatedAmount: '',
    approvedAmount: '',
    status: 'Pending',
    remarks: ''
  });

  // Quick Approval Modal State
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [approvalTarget, setApprovalTarget] = useState(null);
  const [approvalData, setApprovalData] = useState({
    approvedAmount: '',
    status: 'Approved',
    remarks: ''
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

  // Fetch Travel Plans
  const fetchTravelPlans = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/recruitment/travel-plans`, { headers });
      if (res.ok) {
        const data = await res.json();
        setTravelPlans(Array.isArray(data) ? data : []);
      } else {
        showNotification('error', 'Failed to fetch travel plans');
      }
    } catch (err) {
      console.error('Error fetching travel plans:', err);
      showNotification('error', 'Server error loading travel plans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTravelPlans();
  }, []);

  // Filter logic
  const filteredPlans = travelPlans.filter(p => {
    const matchesSearch = 
      (p.candidateName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.empNo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.purpose || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.sourceCity || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.destinationCity || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'All' || p.status === filterStatus;

    let matchesDate = true;
    if (fromDate) {
      const pFrom = new Date(p.fromDate).getTime();
      const filterFrom = new Date(fromDate).getTime();
      if (pFrom < filterFrom) matchesDate = false;
    }
    if (toDate) {
      const pTo = new Date(p.toDate).getTime();
      const filterTo = new Date(toDate).getTime();
      if (pTo > filterTo) matchesDate = false;
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredPlans.length / pageSize) || 1;
  const paginatedPlans = filteredPlans.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Save (Create or Update)
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.candidateName.trim()) {
      showNotification('error', 'Please enter Candidate / Staff Name');
      return;
    }

    try {
      setSubmitting(true);
      const url = editingId 
        ? `${API_BASE}/api/recruitment/travel-plans/${editingId}`
        : `${API_BASE}/api/recruitment/travel-plans`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({
          ...formData,
          estimatedAmount: Number(formData.estimatedAmount) || 0,
          approvedAmount: Number(formData.approvedAmount) || 0
        })
      });

      if (res.ok) {
        showNotification('success', editingId ? 'Travel plan updated successfully!' : 'Travel plan request added successfully!');
        setIsModalOpen(false);
        setEditingId(null);
        fetchTravelPlans();
      } else {
        const errorData = await res.json();
        showNotification('error', errorData.message || 'Error saving travel plan');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Server error while saving');
    } finally {
      setSubmitting(false);
    }
  };

  // Quick Approval Handler
  const handleOpenApprovalModal = (plan, defaultStatus) => {
    setApprovalTarget(plan);
    setApprovalData({
      approvedAmount: plan.approvedAmount > 0 ? plan.approvedAmount : plan.estimatedAmount,
      status: defaultStatus,
      remarks: plan.remarks || ''
    });
    setIsApproveModalOpen(true);
  };

  const submitApproval = async (e) => {
    e.preventDefault();
    if (!approvalTarget) return;

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/api/recruitment/travel-plans/${approvalTarget._id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          approvedAmount: Number(approvalData.approvedAmount) || 0,
          status: approvalData.status,
          remarks: approvalData.remarks
        })
      });

      if (res.ok) {
        showNotification('success', `Travel plan marked as ${approvalData.status}!`);
        setIsApproveModalOpen(false);
        setApprovalTarget(null);
        fetchTravelPlans();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to update approval status');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Server error during status update');
    } finally {
      setSubmitting(false);
    }
  };

  // Open Edit Modal
  const handleEdit = (plan) => {
    setEditingId(plan._id);
    setFormData({
      candidateName: plan.candidateName || '',
      empNo: plan.empNo || '',
      purpose: plan.purpose || 'On-site Interview & Demo',
      fromDate: plan.fromDate ? new Date(plan.fromDate).toISOString().split('T')[0] : '',
      toDate: plan.toDate ? new Date(plan.toDate).toISOString().split('T')[0] : '',
      sourceCity: plan.sourceCity || '',
      destinationCity: plan.destinationCity || '',
      modeOfTravel: plan.modeOfTravel || 'Train',
      estimatedAmount: plan.estimatedAmount || '',
      approvedAmount: plan.approvedAmount || '',
      status: plan.status || 'Pending',
      remarks: plan.remarks || ''
    });
    setIsModalOpen(true);
  };

  // Delete Plan
  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      const res = await fetch(`${API_BASE}/api/recruitment/travel-plans/${deleteConfirmId}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        showNotification('success', 'Travel plan deleted successfully');
        setDeleteConfirmId(null);
        fetchTravelPlans();
      } else {
        showNotification('error', 'Failed to delete travel plan');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Server error while deleting');
    }
  };

  // Export CSV
  const exportCSV = () => {
    if (filteredPlans.length === 0) {
      showNotification('error', 'No data to export');
      return;
    }
    const headersLine = ['Candidate / Staff Name', 'Emp No', 'Purpose', 'From Date', 'To Date', 'From City', 'To City', 'Travel Mode', 'Est. Amount', 'Approved Amount', 'Status', 'Remarks'];
    const rows = filteredPlans.map(p => [
      `"${p.candidateName || ''}"`,
      `"${p.empNo || ''}"`,
      `"${p.purpose || ''}"`,
      `"${p.fromDate ? new Date(p.fromDate).toLocaleDateString() : ''}"`,
      `"${p.toDate ? new Date(p.toDate).toLocaleDateString() : ''}"`,
      `"${p.sourceCity || ''}"`,
      `"${p.destinationCity || ''}"`,
      `"${p.modeOfTravel || ''}"`,
      p.estimatedAmount || 0,
      p.approvedAmount || 0,
      `"${p.status || ''}"`,
      `"${(p.remarks || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersLine.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Travel_Plan_Approvals_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('success', 'Travel plans exported to CSV!');
  };

  // KPIs
  const totalCount = travelPlans.length;
  const pendingCount = travelPlans.filter(p => p.status === 'Pending').length;
  const approvedCount = travelPlans.filter(p => p.status === 'Approved').length;
  const totalApprovedAmt = travelPlans
    .filter(p => p.status === 'Approved' || p.status === 'Reimbursed')
    .reduce((sum, p) => sum + (Number(p.approvedAmount) || 0), 0);

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
            <Plane size={24} color="#159BD7" /> Travel Plan Approval
          </h2>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>
            Review, authorize, and track candidate interview travel and staff travel reimbursement requests
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({
                candidateName: '',
                empNo: '',
                purpose: 'On-site Interview & Demo',
                fromDate: new Date().toISOString().split('T')[0],
                toDate: new Date().toISOString().split('T')[0],
                sourceCity: '',
                destinationCity: '',
                modeOfTravel: 'Train',
                estimatedAmount: '',
                approvedAmount: '',
                status: 'Pending',
                remarks: ''
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
            <Plus size={16} /> New Travel Request
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
            onClick={fetchTravelPlans}
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
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Total Travel Plans</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginTop: '4px' }}>{totalCount}</div>
        </div>
        <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #fef08a', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '12px', color: '#854d0e', fontWeight: '600', textTransform: 'uppercase' }}>Pending Approvals</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#ca8a04', marginTop: '4px' }}>{pendingCount}</div>
        </div>
        <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #bbf7d0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '12px', color: '#166534', fontWeight: '600', textTransform: 'uppercase' }}>Approved Plans</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#16a34a', marginTop: '4px' }}>{approvedCount}</div>
        </div>
        <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #bae6fd', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '12px', color: '#0369a1', fontWeight: '600', textTransform: 'uppercase' }}>Total Authorized (₹)</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#0284c7', marginTop: '4px' }}>
            ₹{totalApprovedAmt.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div style={{ backgroundColor: '#fff', padding: '18px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <div style={{ flex: '1 1 180px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>From Date</label>
          <input
            type="date"
            className="settings-input"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px' }}
          />
        </div>
        <div style={{ flex: '1 1 180px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>To Date</label>
          <input
            type="date"
            className="settings-input"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px' }}
          />
        </div>
        <div style={{ flex: '1 1 160px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Approval Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', backgroundColor: '#fff' }}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Reimbursed">Reimbursed</option>
          </select>
        </div>
        <div style={{ flex: '2 1 240px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Search</label>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search candidate, city, purpose..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '8px 12px 8px 34px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => {
              setFromDate('');
              setToDate('');
              setFilterStatus('All');
              setSearchTerm('');
            }}
            style={{
              padding: '8px 16px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#f1f5f9',
              color: '#475569',
              borderRadius: '6px',
              fontSize: '13px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div style={{ backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #cbd5e1', color: '#334155', fontWeight: '600' }}>
                <th style={{ padding: '12px 14px' }}>#</th>
                <th style={{ padding: '12px 14px' }}>Candidate / Staff</th>
                <th style={{ padding: '12px 14px' }}>Purpose</th>
                <th style={{ padding: '12px 14px' }}>Route & Travel Mode</th>
                <th style={{ padding: '12px 14px' }}>Travel Dates</th>
                <th style={{ padding: '12px 14px' }}>Est. Amount</th>
                <th style={{ padding: '12px 14px' }}>Approved Amt</th>
                <th style={{ padding: '12px 14px' }}>Status</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Approval Action</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Options</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                      <RefreshCw size={20} className="animate-spin" color="#159BD7" />
                      <span>Loading travel plans...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedPlans.length === 0 ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                    No travel plans found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedPlans.map((plan, idx) => {
                  const isAyup = (plan.candidateName || '').toLowerCase().includes('ayup');
                  return (
                    <tr
                      key={plan._id}
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
                          {plan.candidateName}
                          {isAyup && (
                            <span style={{ backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '11px', padding: '1px 6px', borderRadius: '4px', fontWeight: '700', border: '1px solid #7dd3fc', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                              <Sparkles size={10} /> Ayup Tech
                            </span>
                          )}
                        </div>
                        {plan.empNo && (
                          <div style={{ fontSize: '11.5px', color: '#64748b' }}>Emp ID: {plan.empNo}</div>
                        )}
                      </td>
                      <td style={{ padding: '12px 14px', color: '#334155' }}>
                        <div style={{ fontWeight: '500' }}>{plan.purpose}</div>
                        {plan.remarks && <div style={{ fontSize: '11px', color: '#94a3b8' }}>Note: {plan.remarks}</div>}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#1e293b' }}>
                          <MapPin size={13} color="#64748b" />
                          <span>{plan.sourceCity || 'N/A'}</span>
                          <span style={{ color: '#94a3b8' }}>→</span>
                          <span>{plan.destinationCity || 'N/A'}</span>
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                          Mode: <strong>{plan.modeOfTravel}</strong>
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                        <div style={{ fontSize: '12.5px', color: '#334155' }}>
                          {plan.fromDate ? new Date(plan.fromDate).toLocaleDateString() : '-'}
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                          to {plan.toDate ? new Date(plan.toDate).toLocaleDateString() : '-'}
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px', fontWeight: '600', color: '#475569' }}>
                        ₹{(plan.estimatedAmount || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', fontWeight: '700', color: plan.approvedAmount > 0 ? '#16a34a' : '#94a3b8' }}>
                        {plan.approvedAmount > 0 ? `₹${(plan.approvedAmount).toLocaleString('en-IN')}` : '-'}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor:
                            plan.status === 'Approved' ? '#dcfce7' :
                            plan.status === 'Reimbursed' ? '#e0f2fe' :
                            plan.status === 'Rejected' ? '#fee2e2' : '#fef9c3',
                          color:
                            plan.status === 'Approved' ? '#15803d' :
                            plan.status === 'Reimbursed' ? '#0369a1' :
                            plan.status === 'Rejected' ? '#b91c1c' : '#854d0e',
                          border: `1px solid ${
                            plan.status === 'Approved' ? '#86efac' :
                            plan.status === 'Reimbursed' ? '#7dd3fc' :
                            plan.status === 'Rejected' ? '#fca5a5' : '#fde047'
                          }`
                        }}>
                          {plan.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                        {plan.status === 'Pending' ? (
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                            <button
                              onClick={() => handleOpenApprovalModal(plan, 'Approved')}
                              style={{
                                backgroundColor: '#10b981',
                                color: 'white',
                                border: 'none',
                                padding: '4px 10px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px'
                              }}
                            >
                              <CheckCircle size={13} /> Approve
                            </button>
                            <button
                              onClick={() => handleOpenApprovalModal(plan, 'Rejected')}
                              style={{
                                backgroundColor: '#ef4444',
                                color: 'white',
                                border: 'none',
                                padding: '4px 10px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px'
                              }}
                            >
                              <XCircle size={13} /> Reject
                            </button>
                          </div>
                        ) : (
                          <span style={{ fontSize: '12px', color: '#64748b' }}>
                            {plan.status}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                          <button
                            onClick={() => handleEdit(plan)}
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: '#159BD7',
                              cursor: 'pointer',
                              padding: '4px'
                            }}
                            title="Edit Plan"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(plan._id)}
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: '#ef4444',
                              cursor: 'pointer',
                              padding: '4px'
                            }}
                            title="Delete Plan"
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
            Showing {filteredPlans.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredPlans.length)} of {filteredPlans.length} records
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

      {/* Add / Edit Modal */}
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
            maxWidth: '650px',
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
                {editingId ? 'Edit Travel Plan' : 'Create Travel Request'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Candidate / Staff Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayup Tech"
                    value={formData.candidateName}
                    onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Emp No / Application ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. EMP-2026-01"
                    value={formData.empNo}
                    onChange={(e) => setFormData({ ...formData, empNo: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                  Purpose of Travel
                </label>
                <input
                  type="text"
                  placeholder="e.g. Final Technical Panel & Presentation with Ayup Tech"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Source City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Delhi"
                    value={formData.sourceCity}
                    onChange={(e) => setFormData({ ...formData, sourceCity: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Destination City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bangalore"
                    value={formData.destinationCity}
                    onChange={(e) => setFormData({ ...formData, destinationCity: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    From Date
                  </label>
                  <input
                    type="date"
                    value={formData.fromDate}
                    onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    To Date
                  </label>
                  <input
                    type="date"
                    value={formData.toDate}
                    onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Mode of Travel
                  </label>
                  <select
                    value={formData.modeOfTravel}
                    onChange={(e) => setFormData({ ...formData, modeOfTravel: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                  >
                    <option value="Flight">Flight</option>
                    <option value="Train">Train</option>
                    <option value="Bus">Bus</option>
                    <option value="Taxi">Taxi</option>
                    <option value="Personal Vehicle">Personal Vehicle</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Estimated Amount (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={formData.estimatedAmount}
                    onChange={(e) => setFormData({ ...formData, estimatedAmount: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Approved Amount (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={formData.approvedAmount}
                    onChange={(e) => setFormData({ ...formData, approvedAmount: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Reimbursed">Reimbursed</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                  Remarks / Notes
                </label>
                <textarea
                  rows="2"
                  placeholder="Additional notes, flight PNR, reimbursement notes..."
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
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
                    padding: '8px 22px',
                    border: 'none',
                    borderRadius: '6px',
                    backgroundColor: '#159BD7',
                    color: 'white',
                    fontWeight: '600',
                    cursor: submitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {submitting ? 'Saving...' : editingId ? 'Update Request' : 'Save Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Approval / Rejection Modal */}
      {isApproveModalOpen && approvalTarget && (
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
            maxWidth: '480px',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.15)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '16px 20px',
              backgroundColor: approvalData.status === 'Approved' ? '#10b981' : '#ef4444',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                {approvalData.status === 'Approved' ? 'Authorize Travel Plan' : 'Reject Travel Plan'}
              </h3>
              <button
                onClick={() => setIsApproveModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={submitApproval} style={{ padding: '24px' }}>
              <div style={{ marginBottom: '14px', backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: '600', color: '#0f172a' }}>{approvalTarget.candidateName}</div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                  {approvalTarget.purpose} ({approvalTarget.sourceCity} → {approvalTarget.destinationCity})
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                  Requested / Estimated: <strong>₹{(approvalTarget.estimatedAmount || 0).toLocaleString('en-IN')}</strong>
                </div>
              </div>

              {approvalData.status === 'Approved' && (
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Sanctioned / Approved Amount (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={approvalData.approvedAmount}
                    onChange={(e) => setApprovalData({ ...approvalData, approvedAmount: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '15px', fontWeight: '600' }}
                  />
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                  Approval / Rejection Remarks
                </label>
                <textarea
                  rows="3"
                  placeholder="Enter reason or reimbursement instructions..."
                  value={approvalData.remarks}
                  onChange={(e) => setApprovalData({ ...approvalData, remarks: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsApproveModalOpen(false)}
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
                    padding: '8px 22px',
                    border: 'none',
                    borderRadius: '6px',
                    backgroundColor: approvalData.status === 'Approved' ? '#10b981' : '#ef4444',
                    color: 'white',
                    fontWeight: '600',
                    cursor: submitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {submitting ? 'Processing...' : `Confirm ${approvalData.status}`}
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
              Are you sure you want to delete this travel plan? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                onClick={() => setDeleteConfirmId(null)}
                style={{
                  padding: '8px 20px',
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
                onClick={handleDelete}
                style={{
                  padding: '8px 20px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
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
