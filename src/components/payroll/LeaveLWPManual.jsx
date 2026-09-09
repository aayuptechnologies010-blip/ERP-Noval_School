import React, { useState, useEffect } from 'react';
import { Eye, XCircle, Save, Download, RefreshCw, Search, CheckCircle, AlertCircle, Sparkles, Calendar, Clock, DollarSign } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function LeaveLWPManual() {
  const [records, setRecords] = useState([]);
  const [salaryAccounts, setSalaryAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState(null);

  // Filters
  const [filterBank, setFilterBank] = useState('All Salary A/c');
  const [filterStaffType, setFilterStaffType] = useState('All Employee Types');
  const [filterMonthYear, setFilterMonthYear] = useState('Aug-2026');
  const [searchTerm, setSearchTerm] = useState('');

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

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterMonthYear) params.append('monthYear', filterMonthYear);
      if (filterStaffType && filterStaffType !== 'All Employee Types') params.append('staffType', filterStaffType);
      if (filterBank && filterBank !== 'All Salary A/c') params.append('salaryAccount', filterBank);

      const res = await fetch(`${API_BASE}/api/salary-structure/leave-lwp?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setRecords(Array.isArray(data) ? data : []);
      }

      // Fetch salary accounts
      const aRes = await fetch(`${API_BASE}/api/salary-accounts`, { headers });
      if (aRes.ok) {
        const aData = await aRes.json();
        setSalaryAccounts(Array.isArray(aData) ? aData : []);
      }
    } catch (err) {
      console.error('Error fetching Leave LWP records:', err);
      showNotification('error', 'Server error loading LWP records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update field value locally
  const handleFieldChange = (id, field, value) => {
    setRecords(prev => prev.map(item => {
      if (item._id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'lwpDays' || field === 'workingDays') {
          const lwp = Number(field === 'lwpDays' ? value : item.lwpDays) || 0;
          const rate = Number(item.dailyRate) || 1800;
          updated.lwpDeduction = Math.round(lwp * rate);
          const wDays = Number(field === 'workingDays' ? value : item.workingDays) || 26;
          updated.presentDays = Math.max(0, wDays - lwp);
        }
        return updated;
      }
      return item;
    }));
  };

  // Save specific record
  const handleSaveRow = async (item) => {
    try {
      setSavingId(item._id);
      const res = await fetch(`${API_BASE}/api/salary-structure/leave-lwp`, {
        method: 'POST',
        headers,
        body: JSON.stringify(item)
      });

      if (res.ok) {
        showNotification('success', `LWP adjustments saved for ${item.staffName}`);
        fetchData();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to save');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Server error while saving');
    } finally {
      setSavingId(null);
    }
  };

  // Export CSV
  const exportCSV = () => {
    if (filteredRecords.length === 0) return;
    const headersLine = ['Staff Name', 'Employee ID', 'Department', 'Month-Year', 'Working Days', 'Present Days', 'Paid Leaves', 'LWP Days', 'Daily Rate (₹)', 'LWP Deduction (₹)'];
    const rows = filteredRecords.map(r => [
      `"${r.staffName || ''}"`,
      `"${r.employeeId || ''}"`,
      `"${r.department || ''}"`,
      `"${r.monthYear || ''}"`,
      r.workingDays || 26,
      r.presentDays || 26,
      r.paidLeaves || 0,
      r.lwpDays || 0,
      r.dailyRate || 0,
      r.lwpDeduction || 0
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersLine.join(','), ...rows.map(row => row.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `Leave_LWP_Manual_${filterMonthYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('success', 'Leave LWP exported to CSV!');
  };

  // Filtered
  const filteredRecords = records.filter(r => {
    return (
      (r.staffName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.employeeId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.department || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalLWPDays = filteredRecords.reduce((s, r) => s + (Number(r.lwpDays) || 0), 0);
  const totalLWPDeduction = filteredRecords.reduce((s, r) => s + (Number(r.lwpDeduction) || 0), 0);

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
            <Clock size={24} color="#159BD7" /> Leave LWP Manual Adjustment
          </h2>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>
            Configure manual attendance loss of pay (LWP) and unpaid leave deductions for the payroll cycle
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

      {/* Top Filter Card */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
        <div className="settings-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) auto', gap: '16px', alignItems: 'flex-end' }}>
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Salary Account</label>
            <select
              className="settings-input"
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
              className="settings-input"
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
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Month - Year</label>
            <select
              className="settings-input"
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
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Search Staff</label>
            <div style={{ position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search name, ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '8px 10px 8px 32px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>
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

      {/* KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Active Roster Staff</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginTop: '4px' }}>{filteredRecords.length} Staff</div>
        </div>
        <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #fed7aa' }}>
          <div style={{ fontSize: '12px', color: '#9a3412', fontWeight: '600', textTransform: 'uppercase' }}>Total Unpaid / LWP Days</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#ea580c', marginTop: '4px' }}>{totalLWPDays} Days</div>
        </div>
        <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
          <div style={{ fontSize: '12px', color: '#166534', fontWeight: '600', textTransform: 'uppercase' }}>Total LWP Salary Deductions</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#16a34a', marginTop: '4px' }}>
            ₹{totalLWPDeduction.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Main Editable Table */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #cbd5e1', color: '#334155', fontWeight: '600' }}>
                <th style={{ padding: '12px 14px', width: '50px' }}>#</th>
                <th style={{ padding: '12px 14px' }}>Staff Name</th>
                <th style={{ padding: '12px 14px' }}>Department</th>
                <th style={{ padding: '12px 14px', width: '90px' }}>Working Days</th>
                <th style={{ padding: '12px 14px', width: '90px' }}>Present</th>
                <th style={{ padding: '12px 14px', width: '80px' }}>Paid Leaves</th>
                <th style={{ padding: '12px 14px', width: '80px' }}>LWP Days</th>
                <th style={{ padding: '12px 14px', width: '100px' }}>Daily Rate (₹)</th>
                <th style={{ padding: '12px 14px', width: '120px' }}>Deduction (₹)</th>
                <th style={{ padding: '12px 14px', textAlign: 'center', width: '100px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: '36px', color: '#64748b' }}>
                    <RefreshCw size={18} className="animate-spin" style={{ display: 'inline', marginRight: '6px' }} /> Loading records...
                  </td>
                </tr>
              ) : filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                    No LWP records found for selected month and criteria.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r, idx) => {
                  const isAyup = (r.staffName || '').toLowerCase().includes('ayup');
                  return (
                    <tr
                      key={r._id}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        backgroundColor: isAyup ? 'rgba(21, 155, 215, 0.04)' : 'transparent'
                      }}
                    >
                      <td style={{ padding: '10px 14px', color: '#64748b' }}>{idx + 1}</td>
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ fontWeight: '600', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {r.staffName}
                          {isAyup && (
                            <span style={{ backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '10.5px', padding: '1px 5px', borderRadius: '4px', fontWeight: '700', border: '1px solid #7dd3fc' }}>
                              ★ Ayup Tech
                            </span>
                          )}
                        </div>
                        {r.employeeId && <div style={{ fontSize: '11px', color: '#64748b' }}>ID: {r.employeeId}</div>}
                      </td>
                      <td style={{ padding: '10px 14px', color: '#475569' }}>
                        {r.department}
                      </td>
                      <td style={{ padding: '8px 14px' }}>
                        <input
                          type="number"
                          value={r.workingDays}
                          onChange={(e) => handleFieldChange(r._id, 'workingDays', e.target.value)}
                          style={{ width: '70px', padding: '4px 6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'center' }}
                        />
                      </td>
                      <td style={{ padding: '8px 14px' }}>
                        <input
                          type="number"
                          value={r.presentDays}
                          onChange={(e) => handleFieldChange(r._id, 'presentDays', e.target.value)}
                          style={{ width: '70px', padding: '4px 6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'center' }}
                        />
                      </td>
                      <td style={{ padding: '8px 14px' }}>
                        <input
                          type="number"
                          value={r.paidLeaves}
                          onChange={(e) => handleFieldChange(r._id, 'paidLeaves', e.target.value)}
                          style={{ width: '60px', padding: '4px 6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'center' }}
                        />
                      </td>
                      <td style={{ padding: '8px 14px' }}>
                        <input
                          type="number"
                          value={r.lwpDays}
                          onChange={(e) => handleFieldChange(r._id, 'lwpDays', e.target.value)}
                          style={{ width: '60px', padding: '4px 6px', border: '1px solid #fca5a5', backgroundColor: '#fef2f2', borderRadius: '4px', textAlign: 'center', fontWeight: '700', color: '#b91c1c' }}
                        />
                      </td>
                      <td style={{ padding: '10px 14px', color: '#475569' }}>
                        ₹{(r.dailyRate || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '10px 14px', fontWeight: '700', color: r.lwpDeduction > 0 ? '#b91c1c' : '#16a34a' }}>
                        ₹{(r.lwpDeduction || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                        <button
                          onClick={() => handleSaveRow(r)}
                          disabled={savingId === r._id}
                          style={{
                            backgroundColor: '#10b981',
                            color: 'white',
                            border: 'none',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: savingId === r._id ? 'not-allowed' : 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Save size={13} /> {savingId === r._id ? '...' : 'Save'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
