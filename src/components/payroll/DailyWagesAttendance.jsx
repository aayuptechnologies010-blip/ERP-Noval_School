import React, { useState, useEffect } from 'react';
import {
  CalendarDays, Eye, XCircle, Download, Search, CheckCircle,
  AlertCircle, Sparkles, Plus, Users, Clock, DollarSign,
  AlertTriangle, Check, X, Edit2, ShieldCheck
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function DailyWagesAttendance() {
  const [records, setRecords] = useState([]);
  const [salaryAccounts, setSalaryAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Filters matching mockup
  const [schoolBank, setSchoolBank] = useState('All Salary A/c');
  const [employeeType, setEmployeeType] = useState('All Employee Types');
  const [salaryAccount, setSalaryAccount] = useState('All Salary A/C No.');
  const [monthYear, setMonthYear] = useState('Aug-2026');

  // Add Form State
  const [form, setForm] = useState({
    staffName: 'Ayup Daily Worker',
    employeeId: 'DW-AT-005',
    department: 'Campus Maintenance',
    designation: 'General Daily Worker',
    staffType: 'Daily Wages',
    salaryAccount: 'Ayup Salary Account',
    monthYear: 'Aug-2026',
    dailyWageRate: 600,
    totalWorkingDays: 26,
    daysPresent: 25,
    daysAbsent: 1,
    overtimeHours: 8,
    overtimeRate: 85,
    remarks: 'General maintenance & electrical support'
  });

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotif = (type, text) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const fetchDailyWages = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (salaryAccount && salaryAccount !== 'All Salary A/C No.' && salaryAccount !== 'All') {
        params.append('salaryAccount', salaryAccount);
      }
      if (employeeType && employeeType !== 'All Employee Types' && employeeType !== 'All') {
        params.append('staffType', employeeType);
      }
      if (monthYear && monthYear !== 'Select') {
        params.append('monthYear', monthYear);
      }
      if (search) params.append('search', search);

      const res = await fetch(`${API_BASE}/api/salary-structure/daily-wages?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setRecords(Array.isArray(data) ? data : []);
      }

      // Fetch accounts
      const aRes = await fetch(`${API_BASE}/api/salary-accounts`, { headers });
      if (aRes.ok) {
        const aData = await aRes.json();
        setSalaryAccounts(Array.isArray(aData) ? aData : []);
      }
    } catch (err) {
      console.error('Error fetching daily wages:', err);
      showNotif('error', 'Error loading daily wages records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyWages();
  }, []);

  const handleSaveDailyWages = async (e) => {
    if (e) e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/api/salary-structure/daily-wages`, {
        method: 'POST',
        headers,
        body: JSON.stringify(form)
      });
      if (res.ok) {
        const data = await res.json();
        showNotif('success', `Daily wage attendance recorded for ${data.staffName} (Net: ₹${(data.netWages || 0).toLocaleString('en-IN')})`);
        setShowAddModal(false);
        fetchDailyWages();
      } else {
        const err = await res.json();
        showNotif('error', err.message || 'Failed to save daily wages');
      }
    } catch (err) {
      console.error(err);
      showNotif('error', 'Server error saving daily wages');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSchoolBank('All Salary A/c');
    setEmployeeType('All Employee Types');
    setSalaryAccount('All Salary A/C No.');
    setMonthYear('Aug-2026');
    setSearch('');
    setTimeout(() => fetchDailyWages(), 100);
  };

  const exportCSV = () => {
    if (!records.length) return;
    const hdrs = ['#', 'Employee ID', 'Staff Name', 'Department', 'Designation', 'Month', 'Wage Rate', 'Working Days', 'Days Present', 'Days Absent', 'OT Hours', 'OT Rate', 'OT Amount', 'Gross Wages', 'Deductions', 'Net Wages', 'Status', 'Remarks'];
    const rows = records.map((r, i) => [
      i + 1,
      `"${r.employeeId || ''}"`,
      `"${r.staffName || ''}"`,
      `"${r.department || ''}"`,
      `"${r.designation || ''}"`,
      r.monthYear || '',
      r.dailyWageRate || 0,
      r.totalWorkingDays || 0,
      r.daysPresent || 0,
      r.daysAbsent || 0,
      r.overtimeHours || 0,
      r.overtimeRate || 0,
      r.overtimeAmount || 0,
      r.grossWages || 0,
      r.deductions || 0,
      r.netWages || 0,
      `"${r.status || ''}"`,
      `"${r.remarks || ''}"`
    ]);
    const csv = 'data:text/csv;charset=utf-8,' + [hdrs.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `Daily_Wages_Attendance_${monthYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Live calculations for add modal
  const calcOT = (Number(form.overtimeHours) || 0) * (Number(form.overtimeRate) || 0);
  const calcGross = ((Number(form.dailyWageRate) || 0) * (Number(form.daysPresent) || 0)) + calcOT;
  const calcDed = Math.round(calcGross * 0.02);
  const calcNet = Math.max(0, calcGross - calcDed);

  // KPIs
  const totalWorkers = records.length;
  const totalPresentDays = records.reduce((s, r) => s + (r.daysPresent || 0), 0);
  const totalOTHours = records.reduce((s, r) => s + (r.overtimeHours || 0), 0);
  const totalWagesPayable = records.reduce((s, r) => s + (r.netWages || 0), 0);

  const filteredRecords = records.filter(r => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      (r.staffName && r.staffName.toLowerCase().includes(s)) ||
      (r.employeeId && r.employeeId.toLowerCase().includes(s)) ||
      (r.department && r.department.toLowerCase().includes(s))
    );
  });

  return (
    <div className="global-settings-container" style={{ padding: '24px', background: '#f8fafc', minHeight: '100vh' }}>

      {/* NOTIFICATION */}
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
            <CalendarDays size={26} color="#159BD7" />
            Daily Wages Attendance & Register
          </h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
            Record attendance, calculate regular wage days, overtime hours and net daily wages for campus operational staff.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
              background: '#159BD7', color: 'white', border: 'none',
              borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px',
              boxShadow: '0 2px 6px rgba(21, 155, 215, 0.3)'
            }}
          >
            <Plus size={16} /> Record Daily Wages
          </button>
          <button
            onClick={exportCSV}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
              background: 'white', color: '#475569', border: '1px solid #cbd5e1',
              borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px'
            }}
          >
            <Download size={16} /> Export Register
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { icon: <Users size={22} />, bg: '#eff6ff', color: '#159BD7', label: 'Daily Wage Staff', val: totalWorkers },
          { icon: <CheckCircle size={22} />, bg: '#f0fdf4', color: '#16a34a', label: 'Total Days Present', val: `${totalPresentDays} Days` },
          { icon: <Clock size={22} />, bg: '#fef3c7', color: '#d97706', label: 'Overtime Logged', val: `${totalOTHours} Hours` },
          { icon: <DollarSign size={22} />, bg: '#ecfdf5', color: '#059669', label: 'Net Wages Payable', val: `₹${totalWagesPayable.toLocaleString('en-IN')}` },
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

      {/* FILTER PANEL */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>School Bank</label>
            <select
              value={schoolBank}
              onChange={e => setSchoolBank(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All Salary A/c">All Salary A/c</option>
              <option value="HDFC Bank - 50100429188">HDFC Bank - 50100429188</option>
              <option value="SBI Bank - 30219847120">SBI Bank - 30219847120</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Employee Type</label>
            <select
              value={employeeType}
              onChange={e => setEmployeeType(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All Employee Types">All Employee Types</option>
              <option value="Daily Wages">Daily Wages</option>
              <option value="Support">Support</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Salary A/c No.</label>
            <select
              value={salaryAccount}
              onChange={e => setSalaryAccount(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All Salary A/C No.">All Salary A/C No.</option>
              <option value="Ayup Salary Account">Ayup Salary Account</option>
              <option value="Ayup Primary Account">Ayup Primary Account</option>
              {salaryAccounts.map(a => (
                <option key={a._id} value={a.accountName}>{a.accountName} ({a.bank})</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Year - Month</label>
            <select
              value={monthYear}
              onChange={e => setMonthYear(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              {['Aug-2026', 'Jul-2026', 'Jun-2026', 'May-2026', 'Apr-2026'].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        {/* STATUTORY REGULATORY NOTE */}
        <div style={{
          textAlign: 'center', color: '#dc2626', fontWeight: '700', fontSize: '13px',
          background: '#fef2f2', padding: '10px', borderRadius: '6px',
          border: '1px solid #fca5a5', marginBottom: '20px', display: 'flex',
          alignItems: 'center', justifyContent: 'center', gap: '8px'
        }}>
          <AlertTriangle size={18} />
          Note : Maximum working period(s) should not exceed 500.
        </div>

        {/* BUTTONS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button
            onClick={fetchDailyWages}
            style={{
              backgroundColor: '#159BD7', color: 'white', border: 'none',
              padding: '9px 30px', borderRadius: '6px', display: 'flex', alignItems: 'center',
              gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px',
              boxShadow: '0 2px 6px rgba(21, 155, 215, 0.3)'
            }}
          >
            <Eye size={16} /> View Attendance
          </button>
          <button
            onClick={handleReset}
            style={{
              backgroundColor: '#ffbd59', color: 'white', border: 'none',
              padding: '9px 30px', borderRadius: '6px', display: 'flex', alignItems: 'center',
              gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px'
            }}
          >
            <XCircle size={16} /> Reset
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>
            Daily Wages Attendance Records ({filteredRecords.length})
          </div>
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search daily worker name or ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading daily wage records...</div>
        ) : filteredRecords.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No daily wage attendance records found.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  {['#', 'Worker Details', 'Department & Role', 'Wage Rate', 'Attendance (Pres/Abs)', 'Overtime (Hrs/Amt)', 'Gross Wages', 'Deductions (2%)', 'Net Payable', 'Status', 'Remarks'].map((h, i) => (
                    <th key={i} style={{ padding: '12px 14px', fontWeight: '600', textAlign: ['Wage Rate', 'Gross Wages', 'Deductions (2%)', 'Net Payable'].includes(h) ? 'right' : 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((r, i) => {
                  const isAyup = r.staffName?.toLowerCase().includes('ayup');
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
                        <div style={{ fontSize: '11px', color: '#64748b' }}>ID: {r.employeeId} | {r.monthYear}</div>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>
                        <div>{r.department}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{r.designation}</div>
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '600', color: '#0f172a' }}>
                        ₹{(r.dailyWageRate || 0).toLocaleString('en-IN')}/day
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ background: '#ecfdf5', color: '#059669', padding: '2px 8px', borderRadius: '12px', fontWeight: '700', fontSize: '11px' }}>
                          {r.daysPresent || 0} Pres
                        </span>
                        <span style={{ background: '#fef2f2', color: '#dc2626', padding: '2px 8px', borderRadius: '12px', fontWeight: '700', fontSize: '11px', marginLeft: '6px' }}>
                          {r.daysAbsent || 0} Abs
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ fontWeight: '600', color: '#334155' }}>
                          {r.overtimeHours || 0} hrs @ ₹{r.overtimeRate || 0}/hr
                        </div>
                        <div style={{ fontSize: '11px', color: '#16a34a' }}>
                          +₹{(r.overtimeAmount || 0).toLocaleString('en-IN')}
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '600', color: '#334155' }}>
                        ₹{(r.grossWages || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#e11d48' }}>
                        -₹{(r.deductions || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '700', color: '#16a34a', fontSize: '14px' }}>
                        ₹{(r.netWages || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{
                          padding: '3px 9px', borderRadius: '12px', fontSize: '11px', fontWeight: '600',
                          background: '#ecfdf5', color: '#059669'
                        }}>
                          {r.status || 'Approved'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#64748b', fontSize: '12px' }}>
                        {r.remarks || '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL: RECORD DAILY WAGE ATTENDANCE */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '12px', width: '100%', maxWidth: '600px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CalendarDays size={20} color="#159BD7" /> Record Daily Wage Attendance
              </h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveDailyWages} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Worker Name</label>
                  <input
                    type="text"
                    required
                    value={form.staffName}
                    onChange={e => setForm({ ...form, staffName: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Employee / Badge ID</label>
                  <input
                    type="text"
                    value={form.employeeId}
                    onChange={e => setForm({ ...form, employeeId: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Department</label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={e => setForm({ ...form, department: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Designation / Skill</label>
                  <input
                    type="text"
                    value={form.designation}
                    onChange={e => setForm({ ...form, designation: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Daily Wage Rate (₹)</label>
                  <input
                    type="number"
                    value={form.dailyWageRate}
                    onChange={e => setForm({ ...form, dailyWageRate: Number(e.target.value) })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Days Present</label>
                  <input
                    type="number"
                    value={form.daysPresent}
                    onChange={e => setForm({ ...form, daysPresent: Number(e.target.value) })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Days Absent</label>
                  <input
                    type="number"
                    value={form.daysAbsent}
                    onChange={e => setForm({ ...form, daysAbsent: Number(e.target.value) })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Overtime Hours</label>
                  <input
                    type="number"
                    value={form.overtimeHours}
                    onChange={e => setForm({ ...form, overtimeHours: Number(e.target.value) })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>OT Rate (₹/Hour)</label>
                  <input
                    type="number"
                    value={form.overtimeRate}
                    onChange={e => setForm({ ...form, overtimeRate: Number(e.target.value) })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Duty Remarks</label>
                <input
                  type="text"
                  placeholder="e.g. Campus auditorium setup & maintenance"
                  value={form.remarks}
                  onChange={e => setForm({ ...form, remarks: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              {/* LIVE CALCULATION SUMMARY */}
              <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Overtime Amount: ₹{calcOT.toLocaleString('en-IN')} | Gross Wages: ₹{calcGross.toLocaleString('en-IN')}</div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#16a34a' }}>Estimated Net Wages: ₹{calcNet.toLocaleString('en-IN')}</div>
                </div>
                <div style={{ fontSize: '11px', color: '#e11d48' }}>Deductions: -₹{calcDed}</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ padding: '9px 18px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ padding: '9px 20px', background: '#159BD7', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                >
                  {submitting ? 'Saving...' : 'Save Attendance & Wages'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
