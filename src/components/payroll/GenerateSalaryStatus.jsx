import React, { useState, useEffect } from 'react';
import {
  FileCheck, Eye, XCircle, Download, Search, CheckCircle,
  AlertCircle, Sparkles, Users, DollarSign, Clock, ShieldAlert,
  Calendar, Check, X
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function GenerateSalaryStatus() {
  const [records, setRecords] = useState([]);
  const [salaryAccounts, setSalaryAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [search, setSearch] = useState('');

  // Filters matching mockup
  const [schoolBank, setSchoolBank] = useState('All School Banks');
  const [salaryAccount, setSalaryAccount] = useState('All Salary A/C');
  const [employeeType, setEmployeeType] = useState('All Employee Types');
  const [salaryGenStatus, setSalaryGenStatus] = useState('Both'); // 'Both', 'Salary Generated', 'Salary Not Generated'
  const [monthYear, setMonthYear] = useState('Aug-2026');

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotif = (type, text) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const fetchStatusRecords = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (schoolBank && schoolBank !== 'All School Banks' && schoolBank !== 'All') {
        params.append('schoolBank', schoolBank);
      }
      if (salaryAccount && salaryAccount !== 'All Salary A/C' && salaryAccount !== 'All') {
        params.append('salaryAccount', salaryAccount);
      }
      if (employeeType && employeeType !== 'All Employee Types' && employeeType !== 'All') {
        params.append('staffType', employeeType);
      }
      if (monthYear && monthYear !== 'Select') {
        params.append('monthYear', monthYear);
      }
      if (search) params.append('search', search);

      const res = await fetch(`${API_BASE}/api/salary-structure/salary-status?${params.toString()}`, { headers });
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
      console.error('Error fetching salary status:', err);
      showNotif('error', 'Error loading salary generation status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatusRecords();
  }, [salaryGenStatus]);

  const handleReset = () => {
    setSchoolBank('All School Banks');
    setSalaryAccount('All Salary A/C');
    setEmployeeType('All Employee Types');
    setSalaryGenStatus('Both');
    setMonthYear('Aug-2026');
    setSearch('');
    setTimeout(() => fetchStatusRecords(), 100);
  };

  const exportCSV = () => {
    if (!records.length) return;
    const hdrs = ['#', 'Employee ID', 'Staff Name', 'Department', 'Designation', 'Staff Type', 'School Bank', 'Salary Account', 'Month', 'Status', 'Generated On', 'Gross Salary', 'Net Salary', 'Remarks'];
    const rows = records.map((r, i) => [
      i + 1,
      `"${r.employeeId || ''}"`,
      `"${r.staffName || ''}"`,
      `"${r.department || ''}"`,
      `"${r.designation || ''}"`,
      r.staffType || '',
      `"${r.schoolBank || ''}"`,
      `"${r.salaryAccount || ''}"`,
      r.monthYear || '',
      `"${r.generationStatus || ''}"`,
      r.generatedOn ? new Date(r.generatedOn).toLocaleString('en-IN') : 'N/A',
      r.grossSalary || 0,
      r.netSalary || 0,
      `"${r.remarks || ''}"`
    ]);
    const csv = 'data:text/csv;charset=utf-8,' + [hdrs.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `Salary_Generation_Status_${monthYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // KPIs
  const totalStaff = records.length;
  const generatedCount = records.filter(r => r.generationStatus === 'Generated').length;
  const notGeneratedCount = records.filter(r => r.generationStatus === 'Not Generated' || r.generationStatus === 'Pending').length;
  const totalDisbursed = records.reduce((s, r) => s + (r.generationStatus === 'Generated' ? (r.netSalary || 0) : 0), 0);
  const completionRatio = totalStaff ? Math.round((generatedCount / totalStaff) * 100) : 0;

  const filteredRecords = records.filter(r => {
    if (salaryGenStatus === 'Salary Generated' && r.generationStatus !== 'Generated') return false;
    if (salaryGenStatus === 'Salary Not Generated' && r.generationStatus === 'Generated') return false;
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      (r.staffName && r.staffName.toLowerCase().includes(s)) ||
      (r.employeeId && r.employeeId.toLowerCase().includes(s)) ||
      (r.department && r.department.toLowerCase().includes(s)) ||
      (r.generationStatus && r.generationStatus.toLowerCase().includes(s))
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
            <FileCheck size={26} color="#159BD7" />
            Generate Salary Status
          </h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
            Audit verification showing which staff salaries have been generated versus pending payroll runs for {monthYear}.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={exportCSV}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
              background: '#159BD7', color: 'white', border: 'none',
              borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px',
              boxShadow: '0 2px 6px rgba(21, 155, 215, 0.3)'
            }}
          >
            <Download size={16} /> Export Status Report
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { icon: <Users size={22} />, bg: '#eff6ff', color: '#159BD7', label: 'Evaluated Staff', val: totalStaff },
          { icon: <CheckCircle size={22} />, bg: '#f0fdf4', color: '#16a34a', label: 'Salary Generated', val: `${generatedCount} (${completionRatio}%)` },
          { icon: <Clock size={22} />, bg: '#fff1f2', color: '#e11d48', label: 'Pending / Not Generated', val: notGeneratedCount },
          { icon: <DollarSign size={22} />, bg: '#fef3c7', color: '#d97706', label: 'Generated Net Payout', val: `₹${totalDisbursed.toLocaleString('en-IN')}` },
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
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px', textAlign: 'center' }}>
              School Bank
            </label>
            <select
              value={schoolBank}
              onChange={e => setSchoolBank(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All School Banks">All School Banks</option>
              <option value="HDFC Bank - 50100429188">HDFC Bank - 50100429188</option>
              <option value="SBI Bank - 30219847120">SBI Bank - 30219847120</option>
              <option value="ICICI Bank - 00210599182">ICICI Bank - 00210599182</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px', textAlign: 'center' }}>
              Salary A/c No.
            </label>
            <select
              value={salaryAccount}
              onChange={e => setSalaryAccount(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
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
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px', textAlign: 'center' }}>
              Employee Type
            </label>
            <select
              value={employeeType}
              onChange={e => setEmployeeType(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All Employee Types">All Employee Types</option>
              <option value="Teaching">Teaching</option>
              <option value="Non-Teaching">Non-Teaching</option>
              <option value="Technical">Technical</option>
              <option value="Support">Support</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px', textAlign: 'center' }}>
              Month - Year
            </label>
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

        {/* RADIO BUTTONS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '24px' }}>
          {[
            { id: 'Both', label: 'Both (All Records)' },
            { id: 'Salary Generated', label: 'Salary Generated Only' },
            { id: 'Salary Not Generated', label: 'Salary Not Generated / Pending' }
          ].map(opt => (
            <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: salaryGenStatus === opt.id ? '#159BD7' : '#64748b' }}>
              <input
                type="radio"
                name="salaryGenStatusRadio"
                checked={salaryGenStatus === opt.id}
                onChange={() => setSalaryGenStatus(opt.id)}
              /> {opt.label}
            </label>
          ))}
        </div>

        {/* BUTTONS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button
            onClick={fetchStatusRecords}
            style={{
              backgroundColor: '#159BD7', color: 'white', border: 'none',
              padding: '9px 30px', borderRadius: '6px', display: 'flex', alignItems: 'center',
              gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px',
              boxShadow: '0 2px 6px rgba(21, 155, 215, 0.3)'
            }}
          >
            <Eye size={16} /> View Status
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
            Staff Generation Status Records ({filteredRecords.length})
          </div>
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search staff, ID, status..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading status records...</div>
        ) : filteredRecords.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No salary generation status records found.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  {['#', 'Staff Details', 'Department & Role', 'Bank / Salary A/c', 'Month', 'Generation Status', 'Generated Timestamp', 'Gross Salary', 'Net Payable', 'Remarks'].map((h, i) => (
                    <th key={i} style={{ padding: '12px 14px', fontWeight: '600', textAlign: ['Gross Salary', 'Net Payable'].includes(h) ? 'right' : 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((r, i) => {
                  const isAyup = r.staffName?.toLowerCase().includes('ayup');
                  const isGen = r.generationStatus === 'Generated';
                  const isPending = r.generationStatus === 'Pending';
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
                        <div style={{ fontSize: '11px', color: '#64748b' }}>ID: {r.employeeId} | {r.staffType}</div>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>
                        <div>{r.department}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{r.designation}</div>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>
                        <div>{r.schoolBank}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{r.salaryAccount}</div>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{r.monthYear}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{
                          padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '700',
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          background: isGen ? '#ecfdf5' : isPending ? '#fef3c7' : '#fee2e2',
                          color: isGen ? '#059669' : isPending ? '#b45309' : '#dc2626'
                        }}>
                          {isGen ? <CheckCircle size={12} /> : isPending ? <Clock size={12} /> : <X size={12} />}
                          {r.generationStatus}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#64748b', fontSize: '12px' }}>
                        {r.generatedOn ? new Date(r.generatedOn).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#334155' }}>
                        ₹{(r.grossSalary || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '700', color: isGen ? '#16a34a' : '#64748b' }}>
                        ₹{(r.netSalary || 0).toLocaleString('en-IN')}
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

    </div>
  );
}
