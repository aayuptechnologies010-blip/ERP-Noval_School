import React, { useState, useEffect } from 'react';
import { Eye, XCircle, Plus, Download, RefreshCw, Search, Trash2, Edit, CheckCircle, AlertCircle, Sparkles, DollarSign, X } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function OccasionalAllowance() {
  const [entries, setEntries] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [salaryAccounts, setSalaryAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Filters
  const [filterBank, setFilterBank] = useState('All Salary A/c');
  const [filterStaffType, setFilterStaffType] = useState('All Employee Types');
  const [filterMonthYear, setFilterMonthYear] = useState('Aug-2026');
  const [filterHeadType, setFilterHeadType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    staffId: '',
    staffName: 'Ayup Tech',
    employeeId: 'EMP-AT-2026',
    department: 'Information Technology',
    designation: 'Senior Fullstack Lead',
    staffType: 'Teaching',
    salaryAccount: 'Ayup Salary Account',
    monthYear: 'Aug-2026',
    headName: 'Performance Technical Grant & Architecture Incentive',
    headType: 'Addition',
    amount: '15000',
    remarks: 'Awarded for exceptional delivery by Ayup Tech'
  });

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

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterMonthYear) params.append('monthYear', filterMonthYear);
      if (filterStaffType && filterStaffType !== 'All Employee Types') params.append('staffType', filterStaffType);
      if (filterBank && filterBank !== 'All Salary A/c') params.append('salaryAccount', filterBank);

      const res = await fetch(`${API_BASE}/api/salary-structure/occasional-allowance?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setEntries(Array.isArray(data) ? data : []);
      }

      // Fetch staff
      const sRes = await fetch(`${API_BASE}/api/staffs`, { headers });
      if (sRes.ok) {
        const sData = await sRes.json();
        setStaffList(Array.isArray(sData) ? sData : []);
      }

      // Fetch accounts
      const aRes = await fetch(`${API_BASE}/api/salary-accounts`, { headers });
      if (aRes.ok) {
        const aData = await aRes.json();
        setSalaryAccounts(Array.isArray(aData) ? aData : []);
      }
    } catch (err) {
      console.error('Error loading occasional allowances:', err);
      showNotification('error', 'Server error loading data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStaffChange = (staffId) => {
    if (staffId === 'ayup_default') {
      setFormData(prev => ({
        ...prev,
        staffId: '',
        staffName: 'Ayup Tech',
        employeeId: 'EMP-AT-2026',
        department: 'Information Technology',
        designation: 'Senior Fullstack Lead'
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
        department: st.department || 'Academics',
        designation: st.designation || 'Faculty'
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.staffName || !formData.headName || !formData.amount) {
      showNotification('error', 'Please fill all required fields');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/api/salary-structure/occasional-allowance`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount) || 0
        })
      });

      if (res.ok) {
        showNotification('success', 'Occasional head entry recorded successfully!');
        setIsModalOpen(false);
        fetchData();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to save');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Server error while saving');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this occasional allowance entry?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/salary-structure/occasional-allowance/${id}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        showNotification('success', 'Entry deleted successfully');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Export CSV
  const exportCSV = () => {
    if (filteredEntries.length === 0) return;
    const headersLine = ['Staff Name', 'Employee ID', 'Department', 'Month-Year', 'Salary Head', 'Type', 'Amount (₹)', 'Remarks'];
    const rows = filteredEntries.map(e => [
      `"${e.staffName || ''}"`,
      `"${e.employeeId || ''}"`,
      `"${e.department || ''}"`,
      `"${e.monthYear || ''}"`,
      `"${e.headName || ''}"`,
      `"${e.headType || ''}"`,
      e.amount || 0,
      `"${(e.remarks || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersLine.join(','), ...rows.map(row => row.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `Occasional_Allowances_${filterMonthYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('success', 'Occasional allowances exported to CSV!');
  };

  const filteredEntries = entries.filter(e => {
    const matchesSearch =
      (e.staffName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.headName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.remarks || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterHeadType === 'All' || e.headType === filterHeadType;
    return matchesSearch && matchesType;
  });

  const totalAdditions = filteredEntries.filter(e => e.headType === 'Addition').reduce((s, e) => s + (e.amount || 0), 0);
  const totalDeductions = filteredEntries.filter(e => e.headType === 'Deduction').reduce((s, e) => s + (e.amount || 0), 0);

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

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DollarSign size={24} color="#159BD7" /> Occasional Allowance & Deduction
          </h2>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>
            Apply one-off bonuses, project incentives, special festival grants, and ad-hoc deductions
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
            <Plus size={16} /> Add Occasional Entry
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
            title="Refresh"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Top Filter Card */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) auto', gap: '16px', alignItems: 'flex-end' }}>
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Salary Account</label>
            <select
              value={filterBank}
              onChange={(e) => setFilterBank(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}
            >
              <option value="All Salary A/c">All Salary A/c</option>
              <option value="Ayup Salary Account">Ayup Salary Account</option>
              {salaryAccounts.map(a => (
                <option key={a._id} value={a.accountName}>{a.accountName}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Employee Type</label>
            <select
              value={filterStaffType}
              onChange={(e) => setFilterStaffType(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}
            >
              <option value="All Employee Types">All Employee Types</option>
              <option value="Teaching">Teaching Staff</option>
              <option value="Non-Teaching">Non-Teaching Staff</option>
              <option value="Administrative">Administrative</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Year - Month</label>
            <select
              value={filterMonthYear}
              onChange={(e) => setFilterMonthYear(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff', fontWeight: '600' }}
            >
              <option value="Aug-2026">Aug-2026</option>
              <option value="Sep-2026">Sep-2026</option>
              <option value="Oct-2026">Oct-2026</option>
              <option value="Nov-2026">Nov-2026</option>
              <option value="Dec-2026">Dec-2026</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Head Type</label>
            <select
              value={filterHeadType}
              onChange={(e) => setFilterHeadType(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}
            >
              <option value="All">All Heads</option>
              <option value="Addition">Additions (Allowances)</option>
              <option value="Deduction">Deductions</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={fetchData}
              style={{
                backgroundColor: '#159BD7',
                color: 'white',
                border: 'none',
                padding: '9px 20px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              <Eye size={16} /> View
            </button>
            <button
              onClick={() => {
                setFilterBank('All Salary A/c');
                setFilterStaffType('All Employee Types');
                setFilterMonthYear('Aug-2026');
                setFilterHeadType('All');
                setSearchTerm('');
              }}
              style={{
                backgroundColor: '#ffbd59',
                color: 'white',
                border: 'none',
                padding: '9px 16px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              <XCircle size={16} /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Total Occasional Entries</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginTop: '4px' }}>{filteredEntries.length}</div>
        </div>
        <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
          <div style={{ fontSize: '12px', color: '#166534', fontWeight: '600', textTransform: 'uppercase' }}>Total Additions / Grants</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#16a34a', marginTop: '4px' }}>
            +₹{totalAdditions.toLocaleString('en-IN')}
          </div>
        </div>
        <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #fed7aa' }}>
          <div style={{ fontSize: '12px', color: '#9a3412', fontWeight: '600', textTransform: 'uppercase' }}>Total Special Deductions</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#ea580c', marginTop: '4px' }}>
            -₹{totalDeductions.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #cbd5e1', color: '#334155', fontWeight: '600' }}>
              <th style={{ padding: '12px 14px', width: '50px' }}>#</th>
              <th style={{ padding: '12px 14px' }}>Staff Name</th>
              <th style={{ padding: '12px 14px' }}>Salary Head Name</th>
              <th style={{ padding: '12px 14px', width: '120px' }}>Type</th>
              <th style={{ padding: '12px 14px', width: '120px' }}>Amount (₹)</th>
              <th style={{ padding: '12px 14px' }}>Remarks</th>
              <th style={{ padding: '12px 14px', textAlign: 'center', width: '80px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: '#64748b' }}>
                  <RefreshCw size={18} className="animate-spin" style={{ display: 'inline', marginRight: '6px' }} /> Loading entries...
                </td>
              </tr>
            ) : filteredEntries.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                  No occasional allowances or deductions found.
                </td>
              </tr>
            ) : (
              filteredEntries.map((e, idx) => {
                const isAyup = (e.staffName || '').toLowerCase().includes('ayup');
                return (
                  <tr
                    key={e._id}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      backgroundColor: isAyup ? 'rgba(21, 155, 215, 0.04)' : 'transparent'
                    }}
                  >
                    <td style={{ padding: '10px 14px', color: '#64748b' }}>{idx + 1}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <div style={{ fontWeight: '600', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {e.staffName}
                        {isAyup && (
                          <span style={{ backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '10.5px', padding: '1px 5px', borderRadius: '4px', fontWeight: '700', border: '1px solid #7dd3fc' }}>
                            ★ Ayup Tech
                          </span>
                        )}
                      </div>
                      {e.employeeId && <div style={{ fontSize: '11px', color: '#64748b' }}>ID: {e.employeeId}</div>}
                    </td>
                    <td style={{ padding: '10px 14px', fontWeight: '500', color: '#1e293b' }}>
                      {e.headName}
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '10px',
                        fontSize: '11px',
                        fontWeight: '700',
                        backgroundColor: e.headType === 'Addition' ? '#dcfce7' : '#fee2e2',
                        color: e.headType === 'Addition' ? '#166534' : '#b91c1c'
                      }}>
                        {e.headType === 'Addition' ? '+ Addition' : '- Deduction'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px', fontWeight: '700', color: e.headType === 'Addition' ? '#16a34a' : '#ea580c' }}>
                      ₹{(e.amount || 0).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '10px 14px', color: '#64748b' }}>
                      {e.remarks || '—'}
                    </td>
                    <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                      <button
                        onClick={() => handleDelete(e._id)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                        title="Delete"
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

      {/* Add Modal */}
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
            maxWidth: '520px',
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
                Add Occasional Allowance / Deduction
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
                  Select Staff Member <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  value={formData.staffId || (formData.staffName === 'Ayup Tech' ? 'ayup_default' : '')}
                  onChange={(e) => handleStaffChange(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13.5px', backgroundColor: '#fff' }}
                >
                  <option value="ayup_default">Ayup Tech (EMP-AT-2026) - Senior Fullstack Lead</option>
                  {staffList.map(st => {
                    const name = `${st.basicInfo?.firstName || ''} ${st.basicInfo?.lastName || ''}`.trim() || st.name || 'Staff';
                    return (
                      <option key={st._id} value={st._id}>{name} ({st.employeeId || 'No ID'})</option>
                    );
                  })}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Salary Head Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Festival Bonus, Overtime"
                    value={formData.headName}
                    onChange={(e) => setFormData({ ...formData, headName: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Head Type
                  </label>
                  <select
                    value={formData.headType}
                    onChange={(e) => setFormData({ ...formData, headType: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#fff' }}
                  >
                    <option value="Addition">Addition (+)</option>
                    <option value="Deduction">Deduction (-)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Amount (₹) <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: '700', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Month - Year
                  </label>
                  <select
                    value={formData.monthYear}
                    onChange={(e) => setFormData({ ...formData, monthYear: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#fff' }}
                  >
                    <option value="Aug-2026">Aug-2026</option>
                    <option value="Sep-2026">Sep-2026</option>
                    <option value="Oct-2026">Oct-2026</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                  Remarks / Reason
                </label>
                <input
                  type="text"
                  placeholder="Reason for addition or deduction..."
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                />
              </div>

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
                  style={{ padding: '8px 24px', border: 'none', borderRadius: '6px', backgroundColor: '#159BD7', color: 'white', fontWeight: '600', cursor: submitting ? 'not-allowed' : 'pointer' }}
                >
                  {submitting ? 'Saving...' : 'Save Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
