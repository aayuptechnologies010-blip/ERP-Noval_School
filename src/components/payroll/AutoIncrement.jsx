import React, { useState, useEffect } from 'react';
import {
  TrendingUp, Eye, XCircle, Download, Search, CheckCircle,
  AlertCircle, Sparkles, Plus, RotateCcw, DollarSign, Users,
  Calendar, Check, X, ShieldAlert, ArrowUpRight
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function AutoIncrement() {
  const [increments, setIncrements] = useState([]);
  const [salaryAccounts, setSalaryAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Filter & Form States
  const [incType, setIncType] = useState('Basic');
  const [activeArrears, setActiveArrears] = useState(true);
  const [schoolBank, setSchoolBank] = useState('All School Banks');
  const [salaryAccount, setSalaryAccount] = useState('All Salary A/C');
  const [staffType, setStaffType] = useState('All Staff Types');
  const [selectedStaff, setSelectedStaff] = useState('All Staffs');
  const [incrementAppliedFrom, setIncrementAppliedFrom] = useState('Aug-2026');
  const [percentValue, setPercentValue] = useState('10');
  const [amountValue, setAmountValue] = useState('5000');
  const [isAmountMode, setIsAmountMode] = useState(false);
  const [thisMonthOnly, setThisMonthOnly] = useState(false);
  const [remarks, setRemarks] = useState('');

  // Confirmation modal for rollback
  const [rollbackTarget, setRollbackTarget] = useState(null);
  const [rollingBack, setRollingBack] = useState(false);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotif = (type, text) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const fetchIncrements = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (staffType && staffType !== 'All Staff Types' && staffType !== 'All') params.append('staffType', staffType);
      if (salaryAccount && salaryAccount !== 'All Salary A/C' && salaryAccount !== 'All') params.append('salaryAccount', salaryAccount);
      if (incType && incType !== 'All') params.append('incrementType', incType);
      if (search) params.append('search', search);

      const res = await fetch(`${API_BASE}/api/salary-structure/increment?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setIncrements(Array.isArray(data) ? data : []);
      }

      // Fetch accounts
      const aRes = await fetch(`${API_BASE}/api/salary-accounts`, { headers });
      if (aRes.ok) {
        const aData = await aRes.json();
        setSalaryAccounts(Array.isArray(aData) ? aData : []);
      }
    } catch (err) {
      console.error('Error fetching increments:', err);
      showNotif('error', 'Failed to load increment records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncrements();
  }, []);

  const handleApplyIncrement = async (e) => {
    if (e) e.preventDefault();
    try {
      setSubmitting(true);
      const payload = {
        staffName: selectedStaff === 'All Staffs' ? 'Ayup Tech Lead' : selectedStaff,
        employeeId: selectedStaff === 'Ayup Sharma' ? 'EMP-AT-002' : 'EMP-AT-001',
        department: 'Information Technology',
        designation: 'Senior Specialist',
        staffType: staffType === 'All Staff Types' ? 'Teaching' : staffType,
        salaryAccount: salaryAccount === 'All Salary A/C' ? 'Ayup Salary Account' : salaryAccount,
        schoolBank: schoolBank === 'All School Banks' ? 'HDFC Bank - 50100429188' : schoolBank,
        incrementType: incType,
        incrementAppliedFrom,
        percentValue: isAmountMode ? 0 : Number(percentValue) || 0,
        amountValue: isAmountMode ? Number(amountValue) || 0 : 0,
        isAmountMode,
        activeForArrears: activeArrears,
        thisMonthOnly,
        previousAmount: 60000,
        remarks: remarks || `Annual ${incType} increment`
      };

      const res = await fetch(`${API_BASE}/api/salary-structure/increment`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        showNotif('success', `Increment applied successfully for ${data.staffName}! (+₹${(data.incrementAmount || 0).toLocaleString('en-IN')})`);
        setShowModal(false);
        fetchIncrements();
      } else {
        const err = await res.json();
        showNotif('error', err.message || 'Failed to apply increment');
      }
    } catch (err) {
      console.error(err);
      showNotif('error', 'Server error applying increment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRollback = async () => {
    if (!rollbackTarget) return;
    try {
      setRollingBack(true);
      const res = await fetch(`${API_BASE}/api/salary-structure/increment/${rollbackTarget._id}/rollback`, {
        method: 'PUT',
        headers
      });
      if (res.ok) {
        showNotif('success', `Increment rolled back for ${rollbackTarget.staffName}`);
        setRollbackTarget(null);
        fetchIncrements();
      } else {
        const err = await res.json();
        showNotif('error', err.message || 'Rollback failed');
      }
    } catch (err) {
      showNotif('error', 'Server error during rollback');
    } finally {
      setRollingBack(false);
    }
  };

  const handleReset = () => {
    setIncType('Basic');
    setActiveArrears(true);
    setSchoolBank('All School Banks');
    setSalaryAccount('All Salary A/C');
    setStaffType('All Staff Types');
    setSelectedStaff('All Staffs');
    setIncrementAppliedFrom('Aug-2026');
    setPercentValue('10');
    setAmountValue('5000');
    setIsAmountMode(false);
    setThisMonthOnly(false);
    setSearch('');
    setTimeout(() => fetchIncrements(), 100);
  };

  const exportCSV = () => {
    if (!increments.length) return;
    const hdrs = ['#', 'Employee ID', 'Staff Name', 'Department', 'Designation', 'Increment Head', 'Effective From', 'Mode', 'Value', 'Previous Amount', 'Increment Amount', 'New Amount', 'Status'];
    const rows = increments.map((r, i) => [
      i + 1,
      `"${r.employeeId || ''}"`,
      `"${r.staffName || ''}"`,
      `"${r.department || ''}"`,
      `"${r.designation || ''}"`,
      r.incrementType,
      r.incrementAppliedFrom,
      r.isAmountMode ? 'Flat Amount' : 'Percentage',
      r.isAmountMode ? `₹${r.amountValue}` : `${r.percentValue}%`,
      r.previousAmount || 0,
      r.incrementAmount || 0,
      r.newAmount || 0,
      `"${r.status}"`
    ]);
    const csv = 'data:text/csv;charset=utf-8,' + [hdrs.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `Auto_Increment_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // KPIs
  const totalApplied = increments.filter(r => r.status === 'Applied').length;
  const totalIncAmount = increments.reduce((s, r) => s + (r.status === 'Applied' ? (r.incrementAmount || 0) : 0), 0);
  const avgPercent = increments.length
    ? Math.round(increments.reduce((s, r) => s + (r.percentValue || 0), 0) / increments.length)
    : 0;

  const filteredIncrements = increments.filter(r => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      (r.staffName && r.staffName.toLowerCase().includes(s)) ||
      (r.employeeId && r.employeeId.toLowerCase().includes(s)) ||
      (r.incrementType && r.incrementType.toLowerCase().includes(s))
    );
  });

  return (
    <div className="global-settings-container" style={{ padding: '24px', background: '#f8fafc', minHeight: '100vh' }}>
      
      {/* NOTIFICATION TOAST */}
      {statusMsg && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
          padding: '12px 20px', borderRadius: '8px', display: 'flex',
          alignItems: 'center', gap: '10px', fontWeight: '600', fontSize: '13px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          background: statusMsg.type === 'success' ? '#ecfdf5' : '#fef2f2',
          color: statusMsg.type === 'success' ? '#065f46' : '#991b1b',
          border: `1px solid ${statusMsg.type === 'success' ? '#6ee7b7' : '#fca5a5'}`
        }}>
          {statusMsg.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />} {statusMsg.text}
        </div>
      )}

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TrendingUp size={26} color="#159BD7" />
            Auto Increment Management
          </h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
            Configure and apply percentage-based or flat amount salary revisions across staff members.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowModal(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
              background: '#159BD7', color: 'white', border: 'none',
              borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px',
              boxShadow: '0 2px 6px rgba(21, 155, 215, 0.3)'
            }}
          >
            <Plus size={16} /> Apply New Increment
          </button>
          <button
            onClick={exportCSV}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
              background: 'white', color: '#475569', border: '1px solid #cbd5e1',
              borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px'
            }}
          >
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { icon: <Users size={22} />, bg: '#eff6ff', color: '#159BD7', label: 'Total Increment Records', val: increments.length },
          { icon: <CheckCircle size={22} />, bg: '#f0fdf4', color: '#16a34a', label: 'Active Applied', val: totalApplied },
          { icon: <ArrowUpRight size={22} />, bg: '#fef3c7', color: '#d97706', label: 'Average Increment', val: `${avgPercent}%` },
          { icon: <DollarSign size={22} />, bg: '#ecfdf5', color: '#059669', label: 'Monthly Amount Added', val: `₹${totalIncAmount.toLocaleString('en-IN')}` },
        ].map(({ icon, bg, color, label, val }, i) => (
          <div key={i} style={{ background: 'white', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>{icon}</div>
            <div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>{label}</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>{val}</div>
            </div>
          </div>
        ))}
      </div>

      {/* FILTER & CONFIGURATION CARD */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>
            Increment Filter & Rapid Calculator
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ display: 'flex', gap: '15px', background: '#f1f5f9', padding: '6px 14px', borderRadius: '8px' }}>
              {['Basic', 'DA', 'TA', 'HRA'].map(t => (
                <label key={t} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: '600', color: incType === t ? '#159BD7' : '#64748b', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="incTypeRadio"
                    checked={incType === t}
                    onChange={() => setIncType(t)}
                  /> {t}
                </label>
              ))}
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: '#334155', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={activeArrears}
                onChange={e => setActiveArrears(e.target.checked)}
              /> Active for Arrears
            </label>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>School Bank</label>
            <select
              value={schoolBank}
              onChange={e => setSchoolBank(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All School Banks">All School Banks</option>
              <option value="HDFC Bank - 50100429188">HDFC Bank - 50100429188</option>
              <option value="SBI Bank - 30219847120">SBI Bank - 30219847120</option>
              <option value="ICICI Bank - 00210599182">ICICI Bank - 00210599182</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Salary A/c No.</label>
            <select
              value={salaryAccount}
              onChange={e => setSalaryAccount(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All Salary A/C">All Salary A/C</option>
              <option value="Ayup Salary Account">Ayup Salary Account</option>
              <option value="Ayup Primary Account">Ayup Primary Account</option>
              {salaryAccounts.map(a => (
                <option key={a._id} value={a.accountName}>{a.accountName} ({a.bank})</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Staff Type</label>
            <select
              value={staffType}
              onChange={e => setStaffType(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All Staff Types">All Staff Types</option>
              <option value="Teaching">Teaching</option>
              <option value="Non-Teaching">Non-Teaching</option>
              <option value="Technical">Technical</option>
              <option value="Support">Support</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Select Staff</label>
            <select
              value={selectedStaff}
              onChange={e => setSelectedStaff(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All Staffs">All Staffs</option>
              <option value="Ayup Tech Lead">Ayup Tech Lead (EMP-AT-001)</option>
              <option value="Ayup Sharma">Ayup Sharma (EMP-AT-002)</option>
              <option value="Ayup Verma">Ayup Verma (EMP-AT-003)</option>
              <option value="Ayup Khan">Ayup Khan (EMP-AT-004)</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Increment Applied From</label>
            <select
              value={incrementAppliedFrom}
              onChange={e => setIncrementAppliedFrom(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              {['Aug-2026', 'Sep-2026', 'Oct-2026', 'Nov-2026', 'Jul-2026', 'Apr-2026'].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
              {isAmountMode ? 'Amount Value (₹)' : 'Percent Value (%)'}
            </label>
            <input
              type="number"
              value={isAmountMode ? amountValue : percentValue}
              onChange={e => isAmountMode ? setAmountValue(e.target.value) : setPercentValue(e.target.value)}
              placeholder={isAmountMode ? "5000" : "10"}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={thisMonthOnly}
                onChange={e => setThisMonthOnly(e.target.checked)}
              /> This Month Increment Only
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isAmountMode}
                onChange={e => setIsAmountMode(e.target.checked)}
              /> Check For Give Increment As Amount
            </label>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
            <button
              onClick={fetchIncrements}
              style={{
                flex: 1, padding: '9px 18px', background: '#159BD7', color: 'white',
                border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer',
                fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
              }}
            >
              <Eye size={16} /> View Records
            </button>
            <button
              onClick={handleReset}
              style={{
                padding: '9px 18px', background: 'white', color: '#eab308',
                border: '1px solid #eab308', borderRadius: '6px', fontWeight: '600',
                cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px'
              }}
            >
              <XCircle size={16} /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* DATA TABLE */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>
            Increment Registry ({filteredIncrements.length})
          </div>
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search by staff, ID or head..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading increment records...</div>
        ) : filteredIncrements.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No increment records found.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  {['#', 'Staff Details', 'Department & Role', 'Increment Head', 'Effective Month', 'Mode & Value', 'Base Salary', 'Inc. Amount', 'Revised Salary', 'Status', 'Action'].map((h, i) => (
                    <th key={i} style={{ padding: '12px 14px', fontWeight: '600', textAlign: ['Base Salary', 'Inc. Amount', 'Revised Salary'].includes(h) ? 'right' : 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredIncrements.map((r, i) => {
                  const isAyup = r.staffName?.toLowerCase().includes('ayup');
                  const isApplied = r.status === 'Applied';
                  return (
                    <tr key={r._id || i} style={{ borderBottom: '1px solid #f1f5f9', background: isAyup ? '#fffbeb' : 'transparent' }}>
                      <td style={{ padding: '12px 14px', color: '#64748b' }}>{i + 1}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '600', color: '#0f172a' }}>{r.staffName}</span>
                          {isAyup && (
                            <span style={{ background: '#d97706', color: 'white', fontSize: '10px', padding: '2px 7px', borderRadius: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                              <Sparkles size={10} /> Ayup Tech
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>ID: {r.employeeId || 'EMP-AT-2026'} | {r.staffType}</div>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>
                        <div>{r.department}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{r.designation}</div>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '3px 9px', borderRadius: '12px', fontWeight: '600', fontSize: '12px' }}>
                          {r.incrementType}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{r.incrementAppliedFrom}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ fontWeight: '600', color: '#0f172a' }}>
                          {r.isAmountMode ? `₹${(r.amountValue || 0).toLocaleString('en-IN')}` : `${r.percentValue}%`}
                        </div>
                        <div style={{ fontSize: '10px', color: '#64748b' }}>{r.isAmountMode ? 'Flat Amount' : 'Percentage'}</div>
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#475569' }}>
                        ₹{(r.previousAmount || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '700', color: '#16a34a' }}>
                        +₹{(r.incrementAmount || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '700', color: '#0f172a' }}>
                        ₹{(r.newAmount || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{
                          padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600',
                          background: isApplied ? '#ecfdf5' : '#f1f5f9',
                          color: isApplied ? '#059669' : '#64748b'
                        }}>
                          {r.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        {isApplied ? (
                          <button
                            onClick={() => setRollbackTarget(r)}
                            style={{
                              padding: '5px 10px', background: '#fee2e2', color: '#b91c1c',
                              border: '1px solid #fca5a5', borderRadius: '6px', fontSize: '11px',
                              fontWeight: '600', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px'
                            }}
                          >
                            <RotateCcw size={12} /> Rollback
                          </button>
                        ) : (
                          <span style={{ fontSize: '11px', color: '#94a3b8' }}>Reversed</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL: APPLY NEW INCREMENT */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '12px', width: '100%', maxWidth: '550px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={20} color="#159BD7" /> Apply Salary Increment
              </h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleApplyIncrement} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Staff Name</label>
                <input
                  type="text"
                  required
                  defaultValue="Ayup Tech Lead"
                  onChange={e => setSelectedStaff(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Increment Head</label>
                  <select
                    value={incType}
                    onChange={e => setIncType(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  >
                    <option value="Basic">Basic</option>
                    <option value="DA">DA</option>
                    <option value="TA">TA</option>
                    <option value="HRA">HRA</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Effective Month</label>
                  <select
                    value={incrementAppliedFrom}
                    onChange={e => setIncrementAppliedFrom(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  >
                    {['Aug-2026', 'Sep-2026', 'Oct-2026', 'Jul-2026', 'Apr-2026'].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                    {isAmountMode ? 'Increment Amount (₹)' : 'Increment Percentage (%)'}
                  </label>
                  <input
                    type="number"
                    value={isAmountMode ? amountValue : percentValue}
                    onChange={e => isAmountMode ? setAmountValue(e.target.value) : setPercentValue(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: '#334155', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={isAmountMode}
                      onChange={e => setIsAmountMode(e.target.checked)}
                    /> Flat Amount Mode
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: '#334155', cursor: 'pointer', marginTop: '6px' }}>
                    <input
                      type="checkbox"
                      checked={thisMonthOnly}
                      onChange={e => setThisMonthOnly(e.target.checked)}
                    /> This Month Only
                  </label>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Remarks / Reason</label>
                <input
                  type="text"
                  placeholder="e.g. Annual performance review increment"
                  value={remarks}
                  onChange={e => setRemarks(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ padding: '9px 18px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ padding: '9px 20px', background: '#159BD7', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                >
                  {submitting ? 'Applying...' : 'Confirm & Apply'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL FOR ROLLBACK */}
      {rollbackTarget && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '12px', width: '100%', maxWidth: '440px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: '#b91c1c' }}>
              <ShieldAlert size={28} />
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Confirm Increment Rollback</h3>
            </div>
            <p style={{ margin: '0 0 20px', fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
              Are you sure you want to rollback the <strong>{rollbackTarget.incrementType}</strong> increment for <strong>{rollbackTarget.staffName}</strong>?
              Salary will revert to <strong>₹{(rollbackTarget.previousAmount || 0).toLocaleString('en-IN')}</strong>.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setRollbackTarget(null)}
                style={{ padding: '8px 16px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
              >
                Cancel
              </button>
              <button
                onClick={handleRollback}
                disabled={rollingBack}
                style={{ padding: '8px 18px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
              >
                {rollingBack ? 'Rolling back...' : 'Yes, Rollback Increment'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
