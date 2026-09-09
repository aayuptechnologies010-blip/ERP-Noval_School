import React, { useState, useEffect } from 'react';
import { Eye, X, Plus, Search, Download, Trash2, Edit, CheckCircle, AlertCircle, RefreshCw, ShieldCheck, UserCheck, CreditCard, Sparkles, Filter, Calendar } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function RelatePolicyWithEmployee() {
  const [policies, setPolicies] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [salaryAccounts, setSalaryAccounts] = useState([]);
  const [staffTypes, setStaffTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Top Filter Bar State
  const [filterBank, setFilterBank] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterAccountNo, setFilterAccountNo] = useState('');

  // Table Search, Vendor Filter, Status Filter & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVendor, setFilterVendor] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    staffId: '',
    vendorId: '',
    vendorName: '',
    policyNo: '',
    policyName: '',
    premiumAmount: '',
    startDate: new Date().toISOString().split('T')[0],
    maturityDate: '',
    frequency: 'Monthly',
    status: 'Active',
    remarks: ''
  });

  // Delete Confirmation Modal
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

  // 1. Fetch Related Policies
  const fetchPolicies = async () => {
    try {
      setLoading(true);
      let url = `${API_BASE}/api/employee-insurance-policies`;
      const params = new URLSearchParams();
      if (filterStatus && filterStatus !== 'All') params.append('status', filterStatus);
      if (filterVendor) params.append('vendorName', filterVendor);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url, { headers });
      if (res.ok) {
        const data = await res.json();
        setPolicies(Array.isArray(data) ? data : []);
      } else {
        showNotification('error', 'Failed to fetch insurance policies');
      }
    } catch (err) {
      console.error('Error fetching policies:', err);
      showNotification('error', 'Server error loading policies');
    } finally {
      setLoading(false);
    }
  };

  // 2. Fetch Supporting Master Data (Vendors, Staff, Accounts, Types)
  const fetchMasters = async () => {
    try {
      // Vendors
      const vRes = await fetch(`${API_BASE}/api/insurance-vendors`, { headers });
      if (vRes.ok) {
        const vData = await vRes.json();
        setVendors(Array.isArray(vData) ? vData : []);
      }

      // Staffs
      const sRes = await fetch(`${API_BASE}/api/staffs`, { headers });
      if (sRes.ok) {
        const sData = await sRes.json();
        setStaffList(Array.isArray(sData) ? sData : []);
      }

      // Salary Accounts
      const aRes = await fetch(`${API_BASE}/api/salary-accounts`, { headers });
      if (aRes.ok) {
        const aData = await aRes.json();
        setSalaryAccounts(Array.isArray(aData) ? aData : []);
      }

      // Staff Types
      const tRes = await fetch(`${API_BASE}/api/staff-types`, { headers });
      if (tRes.ok) {
        const tData = await tRes.json();
        setStaffTypes(Array.isArray(tData) ? tData : []);
      }
    } catch (err) {
      console.error('Error fetching master data:', err);
    }
  };

  useEffect(() => {
    fetchPolicies();
    fetchMasters();
  }, []);

  // Filter View / Reset actions
  const handleTopFilterApply = () => {
    fetchPolicies();
    showNotification('success', 'Filters applied to employee policies');
  };

  const handleTopFilterReset = () => {
    setFilterBank('');
    setFilterType('');
    setFilterAccountNo('');
    setSearchTerm('');
    setFilterVendor('');
    setFilterStatus('All');
    fetchPolicies();
    showNotification('success', 'Filters reset');
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      staffId: staffList.length > 0 ? staffList[0]._id : '',
      vendorId: vendors.length > 0 ? vendors[0]._id : '',
      vendorName: vendors.length > 0 ? vendors[0].vendorName : '',
      policyNo: '',
      policyName: '',
      premiumAmount: '',
      startDate: new Date().toISOString().split('T')[0],
      maturityDate: '',
      frequency: 'Monthly',
      status: 'Active',
      remarks: ''
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (policy) => {
    setEditingId(policy._id);
    setFormData({
      staffId: policy.staffId || '',
      vendorId: policy.vendorId || '',
      vendorName: policy.vendorName || '',
      policyNo: policy.policyNo || '',
      policyName: policy.policyName || '',
      premiumAmount: policy.premiumAmount || '',
      startDate: policy.startDate ? new Date(policy.startDate).toISOString().split('T')[0] : '',
      maturityDate: policy.maturityDate ? new Date(policy.maturityDate).toISOString().split('T')[0] : '',
      frequency: policy.frequency || 'Monthly',
      status: policy.status || 'Active',
      remarks: policy.remarks || ''
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  // Save Policy Form
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!editingId && !formData.staffId) {
      showNotification('error', 'Please select an employee');
      return;
    }
    if (!formData.vendorName) {
      showNotification('error', 'Please select or provide an insurance vendor');
      return;
    }
    if (!formData.policyNo.trim()) {
      showNotification('error', 'Please enter a policy number');
      return;
    }
    if (formData.premiumAmount === '' || Number(formData.premiumAmount) <= 0) {
      showNotification('error', 'Please enter a valid premium amount');
      return;
    }

    try {
      setSubmitting(true);
      const url = editingId 
        ? `${API_BASE}/api/employee-insurance-policies/${editingId}`
        : `${API_BASE}/api/employee-insurance-policies`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        showNotification('success', editingId ? 'Policy updated successfully!' : 'Policy related to employee successfully!');
        handleCloseModal();
        fetchPolicies();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Operation failed');
      }
    } catch (err) {
      console.error('Error saving policy:', err);
      showNotification('error', 'Server error while saving policy');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Policy
  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      const res = await fetch(`${API_BASE}/api/employee-insurance-policies/${deleteConfirmId}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        showNotification('success', 'Policy relation removed successfully!');
        setDeleteConfirmId(null);
        fetchPolicies();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to delete policy');
      }
    } catch (err) {
      console.error('Error deleting policy:', err);
      showNotification('error', 'Server error deleting policy');
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (policies.length === 0) {
      showNotification('error', 'No records to export');
      return;
    }
    const headersList = ['Staff ID', 'Employee Name', 'Insurance Vendor', 'Policy No', 'Policy Name', 'Monthly Premium', 'Frequency', 'Start Date', 'Maturity Date', 'Status'];
    const rows = filteredPolicies.map(p => [
      `"${p.empNo || ''}"`,
      `"${p.staffName || ''}"`,
      `"${p.vendorName || ''}"`,
      `"${p.policyNo || ''}"`,
      `"${p.policyName || ''}"`,
      p.premiumAmount || 0,
      `"${p.frequency || 'Monthly'}"`,
      p.startDate ? new Date(p.startDate).toLocaleDateString() : '',
      p.maturityDate ? new Date(p.maturityDate).toLocaleDateString() : '',
      `"${p.status || 'Active'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersList.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Employee_Insurance_Policies_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('success', 'Exported employee policies to CSV');
  };

  // Filter and search computation
  const filteredPolicies = policies.filter(p => {
    // Top bank / account filter check against staff data if applicable
    if (filterAccountNo) {
      // If staff matches account
      const staffMatch = staffList.find(s => s._id === p.staffId);
      if (staffMatch && staffMatch.bankAccountNo && !staffMatch.bankAccountNo.includes(filterAccountNo)) {
        return false;
      }
    }
    if (filterType) {
      const staffMatch = staffList.find(s => s._id === p.staffId);
      if (staffMatch) {
        const sType = staffMatch.staffType?.name || staffMatch.staffType || staffMatch.employeeType || '';
        if (typeof sType === 'string' && sType.toLowerCase() !== filterType.toLowerCase()) return false;
      }
    }

    if (filterVendor && p.vendorName !== filterVendor) return false;
    if (filterStatus !== 'All' && p.status !== filterStatus) return false;

    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (p.staffName && p.staffName.toLowerCase().includes(term)) ||
      (p.empNo && p.empNo.toLowerCase().includes(term)) ||
      (p.policyNo && p.policyNo.toLowerCase().includes(term)) ||
      (p.policyName && p.policyName.toLowerCase().includes(term)) ||
      (p.vendorName && p.vendorName.toLowerCase().includes(term))
    );
  });

  // KPI Calculations
  const totalPolicies = filteredPolicies.length;
  const activePolicies = filteredPolicies.filter(p => p.status === 'Active').length;
  const totalPremium = filteredPolicies
    .filter(p => p.status === 'Active')
    .reduce((sum, p) => sum + (Number(p.premiumAmount) || 0), 0);
  const coveredEmployees = new Set(filteredPolicies.map(p => p.staffId || p.empNo)).size;

  // Pagination
  const totalPages = Math.ceil(filteredPolicies.length / pageSize) || 1;
  const paginatedPolicies = filteredPolicies.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
            <span style={{ color: '#159BD7', fontWeight: '600' }}>Relate Policy With Employee</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={26} color="#159BD7" />
            Relate Policy With Employee
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={fetchPolicies}
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
            <Plus size={18} /> Relate New Policy
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Total Assigned Policies</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginTop: '6px' }}>{totalPolicies}</div>
          <div style={{ fontSize: '12px', color: '#10b981', marginTop: '4px' }}>Active policies across staff</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Covered Employees</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#159BD7', marginTop: '6px' }}>{coveredEmployees}</div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Staff members enrolled</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Total Monthly Premium</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#059669', marginTop: '6px' }}>
            ₹{totalPremium.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>Combined active monthly deduction</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Active Status Ratio</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#8b5cf6', marginTop: '6px' }}>
            {totalPolicies > 0 ? Math.round((activePolicies / totalPolicies) * 100) : 0}%
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{activePolicies} of {totalPolicies} policies active</div>
        </div>
      </div>

      {/* Top Filter Card */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        padding: '20px 24px',
        border: '1px solid #e2e8f0',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontWeight: '600', color: '#1e293b' }}>
          <Filter size={16} color="#159BD7" />
          <span>Staff & Bank Filtering</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div className="form-group">
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px', display: 'block' }}>
              School Bank
            </label>
            <select 
              className="settings-input"
              value={filterBank}
              onChange={(e) => setFilterBank(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
            >
              <option value="">All Salary A/c</option>
              {salaryAccounts.map(acc => (
                <option key={acc._id} value={acc.bank || acc.accountName}>
                  {acc.bank ? `${acc.bank} - ${acc.accountNo || ''}` : acc.accountName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px', display: 'block' }}>
              Employee Type
            </label>
            <select 
              className="settings-input"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
            >
              <option value="">All Employee Types</option>
              {staffTypes.map(t => (
                <option key={t._id} value={t.name || t.type || t.staffType}>
                  {t.name || t.type || t.staffType}
                </option>
              ))}
              <option value="Teaching">Teaching</option>
              <option value="Non-Teaching">Non-Teaching</option>
              <option value="Administrative">Administrative</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px', display: 'block' }}>
              Salary A/C No.
            </label>
            <select 
              className="settings-input"
              value={filterAccountNo}
              onChange={(e) => setFilterAccountNo(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
            >
              <option value="">All Salary A/C No.</option>
              {salaryAccounts.map(acc => (
                <option key={acc._id} value={acc.accountNo}>
                  {acc.accountNo} ({acc.bank || acc.accountName})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
          <button 
            onClick={handleTopFilterApply}
            style={{
              backgroundColor: '#ffffff',
              color: '#159BD7',
              border: '1px solid #159BD7',
              padding: '7px 24px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px'
            }}
          >
            <Eye size={16} /> View
          </button>
          <button 
            onClick={handleTopFilterReset}
            style={{
              backgroundColor: '#ffffff',
              color: '#ff9800',
              border: '1px solid #ff9800',
              padding: '7px 24px',
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

      {/* Main Table Container */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        {/* Table Search and Action Bar */}
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
            <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
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
              value={filterVendor}
              onChange={(e) => { setFilterVendor(e.target.value); setCurrentPage(1); }}
              style={{ padding: '7px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
            >
              <option value="">All Insurance Vendors</option>
              {vendors.map(v => (
                <option key={v._id} value={v.vendorName}>{v.vendorName}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
              style={{ padding: '7px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Matured">Matured</option>
              <option value="Cancelled">Cancelled</option>
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

        {/* Policies Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>
                <th style={{ padding: '12px 16px', width: '50px' }}>#</th>
                <th style={{ padding: '12px 16px' }}>Staff ID</th>
                <th style={{ padding: '12px 16px' }}>Employee Name</th>
                <th style={{ padding: '12px 16px' }}>Insurance Vendor</th>
                <th style={{ padding: '12px 16px' }}>Policy No & Name</th>
                <th style={{ padding: '12px 16px' }}>Premium (₹)</th>
                <th style={{ padding: '12px 16px' }}>Frequency</th>
                <th style={{ padding: '12px 16px' }}>Duration</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} style={{ padding: '36px', textAlign: 'center', color: '#64748b' }}>
                    <RefreshCw size={24} className="spin" style={{ margin: '0 auto 8px', display: 'block', animation: 'spin 1s linear infinite' }} />
                    Loading employee insurance policies...
                  </td>
                </tr>
              ) : paginatedPolicies.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                    <ShieldCheck size={36} style={{ margin: '0 auto 10px', color: '#cbd5e1' }} />
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#475569' }}>No Insurance Policies Found</div>
                    <div style={{ fontSize: '13px', marginTop: '4px' }}>Click "+ Relate New Policy" to assign an insurance policy to an employee.</div>
                  </td>
                </tr>
              ) : (
                paginatedPolicies.map((p, idx) => {
                  const isAyup = p.staffName && p.staffName.toLowerCase().includes('ayup');
                  return (
                    <tr 
                      key={p._id} 
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
                          {p.empNo || 'N/A'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '600', color: '#0f172a' }}>{p.staffName}</span>
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
                      <td style={{ padding: '12px 16px', color: '#334155' }}>
                        <div style={{ fontWeight: '500' }}>{p.vendorName}</div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: '600', color: '#159BD7' }}>{p.policyNo}</div>
                        {p.policyName && <div style={{ fontSize: '12px', color: '#64748b' }}>{p.policyName}</div>}
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: '700', color: '#0f172a' }}>
                        ₹{Number(p.premiumAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#475569' }}>
                        <span style={{ backgroundColor: '#f8fafc', padding: '2px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' }}>
                          {p.frequency || 'Monthly'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '12px', color: '#475569' }}>
                        <div>From: {p.startDate ? new Date(p.startDate).toLocaleDateString() : 'N/A'}</div>
                        <div>To: {p.maturityDate ? new Date(p.maturityDate).toLocaleDateString() : 'Continuous'}</div>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span style={{
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '600',
                          backgroundColor: p.status === 'Active' ? '#dcfce7' : (p.status === 'Matured' ? '#e0e7ff' : '#fee2e2'),
                          color: p.status === 'Active' ? '#166534' : (p.status === 'Matured' ? '#3730a3' : '#991b1b')
                        }}>
                          {p.status || 'Active'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                          <button
                            onClick={() => handleOpenEdit(p)}
                            title="Edit Policy"
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
                            onClick={() => setDeleteConfirmId(p._id)}
                            title="Delete Policy"
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
            Showing {filteredPolicies.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, filteredPolicies.length)} of {filteredPolicies.length} entries
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

      {/* Add / Edit Policy Modal */}
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
            maxWidth: '650px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              padding: '16px 24px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f8fafc'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={20} color="#159BD7" />
                {editingId ? 'Edit Employee Policy' : 'Relate Policy With Employee'}
              </h3>
              <button onClick={handleCloseModal} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} style={{ padding: '24px', overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* Staff Selection */}
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' }}>
                    Select Staff / Employee *
                  </label>
                  {editingId ? (
                    <div style={{ padding: '9px 12px', backgroundColor: '#f1f5f9', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}>
                      {formData.staffId ? (staffList.find(s => s._id === formData.staffId)?.firstName + ' ' + (staffList.find(s => s._id === formData.staffId)?.lastName || '')) : 'Employee Selected'}
                    </div>
                  ) : (
                    <select
                      value={formData.staffId}
                      onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                      required
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
                    >
                      <option value="">-- Choose Employee --</option>
                      {staffList.map(st => {
                        const fullName = `${st.firstName || ''} ${st.middleName ? st.middleName + ' ' : ''}${st.lastName || ''}`.trim();
                        const isAyup = fullName.toLowerCase().includes('ayup');
                        return (
                          <option key={st._id} value={st._id}>
                            {st.empNo ? `[${st.empNo}] ` : ''}{fullName} {isAyup ? '⭐ (AYUP TECH)' : ''}
                          </option>
                        );
                      })}
                    </select>
                  )}
                </div>

                {/* Insurance Vendor Selection */}
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' }}>
                    Insurance Vendor *
                  </label>
                  <select
                    value={formData.vendorName}
                    onChange={(e) => {
                      const sel = vendors.find(v => v.vendorName === e.target.value);
                      setFormData({
                        ...formData,
                        vendorName: e.target.value,
                        vendorId: sel ? sel._id : ''
                      });
                    }}
                    required
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
                  >
                    <option value="">-- Select Vendor --</option>
                    {vendors.map(v => (
                      <option key={v._id} value={v.vendorName}>{v.vendorName}</option>
                    ))}
                  </select>
                </div>

                {/* Policy No */}
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' }}>
                    Policy Number *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. POL-AYUP-7722"
                    value={formData.policyNo}
                    onChange={(e) => setFormData({ ...formData, policyNo: e.target.value })}
                    required
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                {/* Policy Name / Plan */}
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' }}>
                    Policy Plan / Scheme Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Health & Life Shield"
                    value={formData.policyName}
                    onChange={(e) => setFormData({ ...formData, policyName: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                {/* Monthly Premium */}
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' }}>
                    Monthly Premium Amount (₹) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g. 2500"
                    value={formData.premiumAmount}
                    onChange={(e) => setFormData({ ...formData, premiumAmount: e.target.value })}
                    required
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                {/* Deduction Frequency */}
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' }}>
                    Deduction Frequency
                  </label>
                  <select
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Half-Yearly">Half-Yearly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>

                {/* Start Date */}
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' }}>
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                {/* Maturity Date */}
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' }}>
                    Maturity / End Date
                  </label>
                  <input
                    type="date"
                    value={formData.maturityDate}
                    onChange={(e) => setFormData({ ...formData, maturityDate: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                {/* Status */}
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
                    <option value="Matured">Matured</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Remarks */}
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' }}>
                    Remarks / Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Policy linked to Ayup Tech staff profile"
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
                    padding: '8px 24px',
                    backgroundColor: '#159BD7',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: submitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {submitting ? 'Saving...' : (editingId ? 'Update Policy' : 'Relate Policy')}
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
            maxWidth: '420px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            textAlign: 'center'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Trash2 size={24} />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Remove Policy Relation</h3>
            <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
              Are you sure you want to remove this employee insurance policy? This will stop future monthly deductions.
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
