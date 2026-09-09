import React, { useState, useEffect } from 'react';
import { Eye, X, Save, Search, Download, CheckSquare, RefreshCw, AlertCircle, CheckCircle, Sliders } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function ModifyStaffInBulk() {
  // Dropdown options
  const [bankAccounts, setBankAccounts] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [designations, setDesignations] = useState([]);

  // Filter States
  const [searchName, setSearchName] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedAccountNo, setSelectedAccountNo] = useState('');
  const [selectedEmployeeType, setSelectedEmployeeType] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');

  // Table Data & Staff
  const [allStaff, setAllStaff] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [editedStaff, setEditedStaff] = useState({}); // { [id]: { ...modifiedFields } }
  const [selectedStaffIds, setSelectedStaffIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Batch Toolbar States
  const [batchStatus, setBatchStatus] = useState('');
  const [batchDesignation, setBatchDesignation] = useState('');
  const [batchStaffType, setBatchStaffType] = useState('');
  const [batchGenSalary, setBatchGenSalary] = useState('');
  const [batchSalaryBank, setBatchSalaryBank] = useState('');

  // Table Search & Pagination
  const [tableSearch, setTableSearch] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Status Notification
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

  // 1. Initial Load: Fetch Options and Staff
  const fetchData = async () => {
    try {
      setLoading(true);
      const [accRes, typeRes, desigRes, staffRes] = await Promise.all([
        fetch(`${API_BASE}/api/salary-accounts`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/staff-types`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/designations`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/staffs`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      if (accRes.ok) setBankAccounts(await accRes.json());
      if (typeRes.ok) setEmployeeTypes(await typeRes.json());
      if (desigRes.ok) setDesignations(await desigRes.json());

      if (staffRes.ok) {
        const sList = await staffRes.json();
        const arr = Array.isArray(sList) ? sList : [];
        setAllStaff(arr);
        setStaffList(arr);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      showNotification('error', 'Server error while loading staff data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Compute Unique Options
  const uniqueBanks = Array.from(new Set([
    ...bankAccounts.map(b => b.bank || b.bankName).filter(Boolean),
    ...allStaff.map(s => s.bankName).filter(Boolean)
  ])).sort();

  const uniqueAccounts = Array.from(new Set([
    ...bankAccounts.map(a => a.accountNo || a.salaryAccountNo).filter(Boolean),
    ...allStaff.map(s => s.bankAccNo || s.empAccNo).filter(Boolean)
  ])).sort();

  const uniqueEmployeeTypes = Array.from(new Set([
    ...employeeTypes.map(t => t.type || t.staffType || t.name).filter(Boolean),
    ...allStaff.map(s => s.staffType).filter(Boolean)
  ])).sort();

  const uniqueDesignations = Array.from(new Set([
    ...designations.map(d => d.type || d.designation || d.name).filter(Boolean),
    ...allStaff.map(s => s.designation).filter(Boolean)
  ])).sort();

  // Filter Handler
  const handleView = () => {
    let filtered = [...allStaff];

    if (searchName.trim()) {
      const sn = searchName.trim().toLowerCase();
      filtered = filtered.filter(s => {
        const name = `${s.firstName || ''} ${s.middleName || ''} ${s.lastName || ''}`.toLowerCase();
        const empNo = (s.empNo || s.userName || '').toLowerCase();
        return name.includes(sn) || empNo.includes(sn);
      });
    }

    if (selectedBank) {
      filtered = filtered.filter(s => (s.bankName || '').toLowerCase() === selectedBank.toLowerCase());
    }

    if (selectedAccountNo) {
      filtered = filtered.filter(s => (s.bankAccNo || s.empAccNo || '') === selectedAccountNo);
    }

    if (selectedEmployeeType && selectedEmployeeType !== 'All') {
      filtered = filtered.filter(s => s.staffType === selectedEmployeeType);
    }

    if (selectedDesignation && selectedDesignation !== 'All') {
      filtered = filtered.filter(s => s.designation === selectedDesignation);
    }

    setStaffList(filtered);
    setSelectedStaffIds([]);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchName('');
    setSelectedBank('');
    setSelectedAccountNo('');
    setSelectedEmployeeType('');
    setSelectedDesignation('');
    setStaffList(allStaff);
    setSelectedStaffIds([]);
    setEditedStaff({});
    setTableSearch('');
    setCurrentPage(1);
    setStatusMessage(null);
  };

  // Inline Row Field Edit
  const handleFieldChange = (staffId, field, value) => {
    setEditedStaff(prev => ({
      ...prev,
      [staffId]: {
        ...(prev[staffId] || {}),
        [field]: value
      }
    }));

    // Auto-select modified row
    if (!selectedStaffIds.includes(staffId)) {
      setSelectedStaffIds(prev => [...prev, staffId]);
    }
  };

  // Apply Batch Fields to Selected Rows
  const handleApplyBatch = () => {
    if (selectedStaffIds.length === 0) {
      showNotification('error', 'Please select at least one staff member.');
      return;
    }

    const updates = { ...editedStaff };
    selectedStaffIds.forEach(id => {
      updates[id] = { ...(updates[id] || {}) };
      if (batchStatus) updates[id].salaryStatus = batchStatus;
      if (batchDesignation) updates[id].designation = batchDesignation;
      if (batchStaffType) updates[id].staffType = batchStaffType;
      if (batchGenSalary !== '') updates[id].generateSalary = batchGenSalary === 'true';
      if (batchSalaryBank !== '') updates[id].salaryToBank = batchSalaryBank === 'true';
    });

    setEditedStaff(updates);
    showNotification('success', `Applied batch values to ${selectedStaffIds.length} staff member(s). Click "Save Changes" to commit.`);
  };

  // Save All Changes to Backend
  const handleSaveChanges = async () => {
    const idsToUpdate = selectedStaffIds.length > 0 ? selectedStaffIds : Object.keys(editedStaff);

    if (idsToUpdate.length === 0) {
      showNotification('error', 'No staff changes detected to save.');
      return;
    }

    const updatesPayload = idsToUpdate.map(id => {
      const original = allStaff.find(s => s._id === id) || {};
      const changes = editedStaff[id] || {};
      return {
        staffId: id,
        ...changes
      };
    });

    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/api/staffs/bulk/modify`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ updates: updatesPayload })
      });

      if (res.ok) {
        showNotification('success', `Updated ${updatesPayload.length} staff record(s) successfully!`);
        setEditedStaff({});
        setSelectedStaffIds([]);

        // Reload latest staff data
        const refreshRes = await fetch(`${API_BASE}/api/staffs`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (refreshRes.ok) {
          const arr = await refreshRes.json();
          setAllStaff(arr);
          setStaffList(arr);
        }
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to update staff records');
      }
    } catch (err) {
      console.error('Error saving staff bulk edits:', err);
      showNotification('error', 'Server error while updating staff');
    } finally {
      setSaving(false);
    }
  };

  // Table Search Filter
  const searchedStaff = staffList.filter(s => {
    const fullName = `${s.firstName || ''} ${s.middleName || ''} ${s.lastName || ''}`.toLowerCase();
    const empNo = (s.empNo || s.userName || '').toLowerCase();
    const desig = (s.designation || '').toLowerCase();
    const type = (s.staffType || '').toLowerCase();
    const mobile = (s.contactNo || '').toLowerCase();
    const q = tableSearch.toLowerCase();
    return !tableSearch || fullName.includes(q) || empNo.includes(q) || desig.includes(q) || type.includes(q) || mobile.includes(q);
  });

  const totalPages = Math.ceil(searchedStaff.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentRows = searchedStaff.slice(startIndex, startIndex + pageSize);

  const areAllOnPageSelected = currentRows.length > 0 && currentRows.every(s => selectedStaffIds.includes(s._id));

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const pageStaffIds = currentRows.map(s => s._id);
      setSelectedStaffIds(prev => Array.from(new Set([...prev, ...pageStaffIds])));
    } else {
      const pageStaffIds = new Set(currentRows.map(s => s._id));
      setSelectedStaffIds(prev => prev.filter(id => !pageStaffIds.has(id)));
    }
  };

  const handleRowSelect = (id) => {
    setSelectedStaffIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Export CSV
  const handleExportCSV = () => {
    if (staffList.length === 0) return;
    const csvRows = [
      ['Emp No', 'Staff Name', 'Designation', 'Staff Type', 'Mobile', 'Bank', 'Bank A/C', 'Status', 'Generate Salary', 'Salary to Bank'],
      ...staffList.map(s => {
        const ed = editedStaff[s._id] || {};
        const desig = ed.designation !== undefined ? ed.designation : s.designation || '';
        const stype = ed.staffType !== undefined ? ed.staffType : s.staffType || '';
        const mob = ed.contactNo !== undefined ? ed.contactNo : s.contactNo || '';
        const stat = ed.salaryStatus !== undefined ? ed.salaryStatus : s.salaryStatus || 'Active';
        const genSal = ed.generateSalary !== undefined ? ed.generateSalary : s.generateSalary !== false;
        const toBank = ed.salaryToBank !== undefined ? ed.salaryToBank : s.salaryToBank !== false;
        const fullName = `${s.firstName || ''} ${s.lastName || ''}`.trim();
        return [
          s.empNo || s.userName || '',
          fullName,
          desig,
          stype,
          mob,
          s.bankName || '',
          s.bankAccNo || '',
          stat,
          genSal ? 'Yes' : 'No',
          toBank ? 'Yes' : 'No'
        ];
      })
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.map(i => `"${i}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `staff_bulk_modify_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="global-settings-container" style={{ padding: '20px' }}>
      {/* Alert Notifications */}
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

      {/* Top Filter Card */}
      <div style={{ padding: '20px 30px', maxWidth: '900px', margin: '0 auto 25px auto', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '25px', flexWrap: 'wrap' }}>
          <label style={{ fontWeight: '600', fontSize: '13px', color: '#334155' }}>Enter/Search Name</label>
          <input 
            type="text" 
            placeholder="Search by Employee Name or Code..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleView(); }}
            className="settings-input" 
            style={{ width: '320px', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
          />
          <button 
            onClick={handleView}
            style={{ 
              backgroundColor: 'white', 
              color: '#159BD7', 
              border: '1px solid #159BD7', 
              padding: '8px 18px', 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            <Search size={16} /> Search
          </button>
        </div>

        <div className="settings-row" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px', 
          marginBottom: '20px',
          padding: 0
        }}>
          {/* School Bank */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>School Bank</label>
            <select 
              className="settings-input"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="">All School Banks</option>
              {uniqueBanks.map((b, i) => <option key={i} value={b}>{b}</option>)}
            </select>
          </div>

          {/* Salary A/C No */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Salary A/C No</label>
            <select 
              className="settings-input"
              value={selectedAccountNo}
              onChange={(e) => setSelectedAccountNo(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="">All Salary A/C No.</option>
              {uniqueAccounts.map((acc, i) => (
                <option key={i} value={acc}>{acc}</option>
              ))}
            </select>
          </div>

          {/* Employee Type */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Employee Type</label>
            <select 
              className="settings-input"
              value={selectedEmployeeType}
              onChange={(e) => setSelectedEmployeeType(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="">All Employee Types</option>
              {uniqueEmployeeTypes.map((t, idx) => (
                <option key={idx} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Designation */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Designation</label>
            <select 
              className="settings-input"
              value={selectedDesignation}
              onChange={(e) => setSelectedDesignation(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="">All Designations</option>
              {uniqueDesignations.map((d, i) => <option key={i} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button 
            onClick={handleView}
            disabled={loading}
            style={{ 
              backgroundColor: 'white', 
              color: '#159BD7', 
              border: '1px solid #159BD7', 
              padding: '8px 24px', 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600'
            }}
          >
            <Eye size={16} /> {loading ? 'Loading...' : 'View'}
          </button>
          <button 
            onClick={handleReset}
            style={{ 
              backgroundColor: 'white', 
              color: '#ff9800', 
              border: '1px solid #ff9800', 
              padding: '8px 24px', 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            <X size={16} /> Reset
          </button>
        </div>
      </div>

      {/* Main Staff Modification Section */}
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        {/* Bulk Action Toolbar */}
        <div style={{
          background: '#f1f5f9',
          padding: '16px 20px',
          borderRadius: '6px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Sliders size={16} /> Batch Tool:
            </span>

            {/* Set Status */}
            <select 
              value={batchStatus} 
              onChange={(e) => setBatchStatus(e.target.value)}
              style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' }}
            >
              <option value="">Set Salary Status...</option>
              <option value="Active">Active</option>
              <option value="Resigned">Resigned</option>
              <option value="Suspended">Suspended</option>
              <option value="Leave">Leave</option>
            </select>

            {/* Set Designation */}
            <select 
              value={batchDesignation} 
              onChange={(e) => setBatchDesignation(e.target.value)}
              style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' }}
            >
              <option value="">Set Designation...</option>
              {uniqueDesignations.map((d, i) => <option key={i} value={d}>{d}</option>)}
            </select>

            {/* Set Staff Type */}
            <select 
              value={batchStaffType} 
              onChange={(e) => setBatchStaffType(e.target.value)}
              style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' }}
            >
              <option value="">Set Employee Type...</option>
              {uniqueEmployeeTypes.map((t, i) => <option key={i} value={t}>{t}</option>)}
            </select>

            {/* Generate Salary */}
            <select 
              value={batchGenSalary} 
              onChange={(e) => setBatchGenSalary(e.target.value)}
              style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' }}
            >
              <option value="">Gen Salary...</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

            <button
              onClick={handleApplyBatch}
              disabled={selectedStaffIds.length === 0}
              style={{
                backgroundColor: '#0284c7',
                color: 'white',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: selectedStaffIds.length === 0 ? 'not-allowed' : 'pointer',
                opacity: selectedStaffIds.length === 0 ? 0.6 : 1
              }}
            >
              Apply to Selected ({selectedStaffIds.length})
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleExportCSV}
              style={{
                backgroundColor: 'white',
                color: '#475569',
                border: '1px solid #cbd5e1',
                padding: '7px 15px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <Download size={15} /> Export CSV
            </button>
            <button
              onClick={handleSaveChanges}
              disabled={saving}
              style={{
                backgroundColor: '#16a34a',
                color: 'white',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '600',
                cursor: saving ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 4px rgba(22, 163, 74, 0.25)'
              }}
            >
              <Save size={16} /> {saving ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Table Search & Count Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontWeight: '700', fontSize: '14px', color: '#1e293b' }}>
            MODIFY STAFF IN BULK ({searchedStaff.length})
            {Object.keys(editedStaff).length > 0 && (
              <span style={{ marginLeft: '10px', fontSize: '12px', color: '#ea580c', fontWeight: '600' }}>
                ({Object.keys(editedStaff).length} unsaved modification{Object.keys(editedStaff).length > 1 ? 's' : ''})
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Search:</span>
            <input 
              type="text"
              placeholder="Filter by name, code, type, mobile..."
              value={tableSearch}
              onChange={(e) => { setTableSearch(e.target.value); setCurrentPage(1); }}
              style={{ padding: '6px 12px', borderRadius: '20px', border: '1px solid #cbd5e1', width: '240px' }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="mail-table-wrapper" style={{ overflowX: 'auto' }}>
          <table className="mail-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ width: '45px', textAlign: 'center', padding: '12px' }}>
                  <input 
                    type="checkbox"
                    checked={areAllOnPageSelected}
                    onChange={handleSelectAll}
                    style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                  />
                </th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Emp No.</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Staff Name</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Employee Type</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Designation</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Mobile No.</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Status</th>
                <th style={{ textAlign: 'center', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Gen Salary</th>
                <th style={{ textAlign: 'center', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Salary to Bank</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    <RefreshCw className="animate-spin" size={24} style={{ display: 'inline-block', marginBottom: '8px' }} />
                    <div>Loading staff members...</div>
                  </td>
                </tr>
              ) : currentRows.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                    No staff records found matching criteria.
                  </td>
                </tr>
              ) : (
                currentRows.map((staff, idx) => {
                  const isChecked = selectedStaffIds.includes(staff._id);
                  const isAyup = (staff.firstName && staff.firstName.toLowerCase().includes('ayup')) || (staff.userName === 'SF072');
                  const fullName = `${staff.firstName || ''} ${staff.middleName ? staff.middleName + ' ' : ''}${staff.lastName || ''}`.trim();
                  
                  // Read current edits or fallback to staff properties
                  const edits = editedStaff[staff._id] || {};
                  const currentDesig = edits.designation !== undefined ? edits.designation : (staff.designation || '');
                  const currentType = edits.staffType !== undefined ? edits.staffType : (staff.staffType || '');
                  const currentMobile = edits.contactNo !== undefined ? edits.contactNo : (staff.contactNo || '');
                  const currentStatus = edits.salaryStatus !== undefined ? edits.salaryStatus : (staff.salaryStatus || 'Active');
                  const currentGenSalary = edits.generateSalary !== undefined ? edits.generateSalary : (staff.generateSalary !== false);
                  const currentSalaryToBank = edits.salaryToBank !== undefined ? edits.salaryToBank : (staff.salaryToBank !== false);
                  const isModified = Object.keys(edits).length > 0;

                  return (
                    <tr 
                      key={staff._id}
                      style={{
                        backgroundColor: isChecked ? '#f0f9ff' : (isModified ? '#fffbeb' : (idx % 2 === 0 ? '#ffffff' : '#f8fafc')),
                        borderBottom: '1px solid #f1f5f9'
                      }}
                    >
                      <td style={{ textAlign: 'center', padding: '10px' }}>
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleRowSelect(staff._id)}
                          style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                        />
                      </td>
                      <td style={{ padding: '10px', fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                        {staff.empNo || staff.userName || '-'}
                      </td>
                      <td style={{ padding: '10px', fontSize: '13px', fontWeight: isAyup ? '700' : '600', color: isAyup ? '#0288d1' : '#1e293b' }}>
                        {fullName}
                        {isAyup && (
                          <span style={{ marginLeft: '8px', fontSize: '10px', backgroundColor: '#e1f5fe', color: '#0288d1', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>
                            Verified (Ayup Tech)
                          </span>
                        )}
                        {isModified && (
                          <span style={{ marginLeft: '6px', fontSize: '10px', backgroundColor: '#fef3c7', color: '#b45309', padding: '1px 5px', borderRadius: '3px' }}>
                            Edited
                          </span>
                        )}
                      </td>

                      {/* Staff Type */}
                      <td style={{ padding: '8px' }}>
                        <select
                          value={currentType}
                          onChange={(e) => handleFieldChange(staff._id, 'staffType', e.target.value)}
                          style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px', width: '130px' }}
                        >
                          <option value="">Select Type</option>
                          {uniqueEmployeeTypes.map((t, i) => <option key={i} value={t}>{t}</option>)}
                        </select>
                      </td>

                      {/* Designation */}
                      <td style={{ padding: '8px' }}>
                        <select
                          value={currentDesig}
                          onChange={(e) => handleFieldChange(staff._id, 'designation', e.target.value)}
                          style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px', width: '130px' }}
                        >
                          <option value="">Select Designation</option>
                          {uniqueDesignations.map((d, i) => <option key={i} value={d}>{d}</option>)}
                        </select>
                      </td>

                      {/* Mobile */}
                      <td style={{ padding: '8px' }}>
                        <input
                          type="text"
                          value={currentMobile}
                          onChange={(e) => handleFieldChange(staff._id, 'contactNo', e.target.value)}
                          style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px', width: '110px' }}
                          placeholder="Phone..."
                        />
                      </td>

                      {/* Status */}
                      <td style={{ padding: '8px' }}>
                        <select
                          value={currentStatus}
                          onChange={(e) => handleFieldChange(staff._id, 'salaryStatus', e.target.value)}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: '1px solid #cbd5e1',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: currentStatus === 'Active' ? '#16a34a' : (currentStatus === 'Resigned' ? '#dc2626' : '#d97706')
                          }}
                        >
                          <option value="Active">Active</option>
                          <option value="Resigned">Resigned</option>
                          <option value="Suspended">Suspended</option>
                          <option value="Leave">Leave</option>
                        </select>
                      </td>

                      {/* Generate Salary */}
                      <td style={{ textAlign: 'center', padding: '8px' }}>
                        <input 
                          type="checkbox"
                          checked={currentGenSalary}
                          onChange={(e) => handleFieldChange(staff._id, 'generateSalary', e.target.checked)}
                          style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                        />
                      </td>

                      {/* Salary to Bank */}
                      <td style={{ textAlign: 'center', padding: '8px' }}>
                        <input 
                          type="checkbox"
                          checked={currentSalaryToBank}
                          onChange={(e) => handleFieldChange(staff._id, 'salaryToBank', e.target.checked)}
                          style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                        />
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
              <option value={100}>100</option>
            </select>
            entries
          </div>

          <div>
            Showing {searchedStaff.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + pageSize, searchedStaff.length)} of {searchedStaff.length} entries
          </div>

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{ 
                padding: '5px 12px', 
                border: '1px solid #cbd5e1', 
                borderRadius: '4px', 
                background: currentPage === 1 ? '#f8fafc' : '#fff',
                color: currentPage === 1 ? '#94a3b8' : '#1e293b',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Previous
            </button>
            <span style={{ 
              padding: '5px 12px', 
              backgroundColor: '#159BD7', 
              color: 'white', 
              borderRadius: '4px',
              fontWeight: '600'
            }}>
              {currentPage}
            </span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{ 
                padding: '5px 12px', 
                border: '1px solid #cbd5e1', 
                borderRadius: '4px', 
                background: currentPage === totalPages ? '#f8fafc' : '#fff',
                color: currentPage === totalPages ? '#94a3b8' : '#1e293b',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
