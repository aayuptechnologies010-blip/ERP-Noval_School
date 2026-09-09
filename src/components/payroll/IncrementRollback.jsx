import React, { useState, useEffect } from 'react';
import {
  RotateCcw, Eye, XCircle, Download, Search, CheckCircle,
  AlertCircle, Sparkles, ShieldAlert, Users, DollarSign,
  ArrowDownLeft, History, Check, X
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function IncrementRollback() {
  const [increments, setIncrements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [search, setSearch] = useState('');

  // Controls matching original
  const [rollbackType, setRollbackType] = useState('Basic'); // 'Basic' or 'Head'
  const [staffType, setStaffType] = useState('All Staffs');

  // Confirmation state
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
      if (staffType && staffType !== 'All Staffs' && staffType !== 'All') {
        params.append('staffType', staffType);
      }
      if (rollbackType === 'Basic') {
        params.append('incrementType', 'Basic');
      }
      if (search) params.append('search', search);

      const res = await fetch(`${API_BASE}/api/salary-structure/increment?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setIncrements(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Error loading increments:', err);
      showNotif('error', 'Failed to load increment records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncrements();
  }, [rollbackType]);

  const handleRollback = async () => {
    if (!rollbackTarget) return;
    try {
      setRollingBack(true);
      const res = await fetch(`${API_BASE}/api/salary-structure/increment/${rollbackTarget._id}/rollback`, {
        method: 'PUT',
        headers
      });
      if (res.ok) {
        showNotif('success', `Increment successfully rolled back for ${rollbackTarget.staffName}!`);
        setRollbackTarget(null);
        fetchIncrements();
      } else {
        const err = await res.json();
        showNotif('error', err.message || 'Rollback operation failed');
      }
    } catch (err) {
      showNotif('error', 'Server error during rollback');
    } finally {
      setRollingBack(false);
    }
  };

  const handleReset = () => {
    setRollbackType('Basic');
    setStaffType('All Staffs');
    setSearch('');
    setTimeout(() => fetchIncrements(), 100);
  };

  const exportCSV = () => {
    if (!increments.length) return;
    const hdrs = ['#', 'Employee ID', 'Staff Name', 'Department', 'Designation', 'Increment Head', 'Applied Month', 'Previous Base', 'Increment Amount', 'Revised Salary', 'Status'];
    const rows = increments.map((r, i) => [
      i + 1,
      `"${r.employeeId || ''}"`,
      `"${r.staffName || ''}"`,
      `"${r.department || ''}"`,
      `"${r.designation || ''}"`,
      r.incrementType,
      r.incrementAppliedFrom,
      r.previousAmount || 0,
      r.incrementAmount || 0,
      r.newAmount || 0,
      `"${r.status}"`
    ]);
    const csv = 'data:text/csv;charset=utf-8,' + [hdrs.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `Increment_Rollback_Audit.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // KPIs
  const appliedList = increments.filter(r => r.status === 'Applied');
  const rolledBackCount = increments.filter(r => r.status === 'Rolled Back').length;
  const reversibleAmount = appliedList.reduce((s, r) => s + (r.incrementAmount || 0), 0);

  const filteredIncrements = increments.filter(r => {
    if (rollbackType === 'Head' && r.incrementType === 'Basic') return false;
    if (rollbackType === 'Basic' && r.incrementType !== 'Basic') return false;
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
            <RotateCcw size={26} color="#e11d48" />
            Increment Rollback Management
          </h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
            Selectively revert individual or bulk increments on Basic Pay or Allowance Heads back to previous amounts.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={exportCSV}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
              background: 'white', color: '#475569', border: '1px solid #cbd5e1',
              borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px'
            }}
          >
            <Download size={16} /> Export Rollback Audit
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { icon: <Users size={22} />, bg: '#eff6ff', color: '#159BD7', label: 'Eligible for Rollback', val: appliedList.length },
          { icon: <History size={22} />, bg: '#f1f5f9', color: '#64748b', label: 'Already Rolled Back', val: rolledBackCount },
          { icon: <DollarSign size={22} />, bg: '#fff1f2', color: '#e11d48', label: 'Reversible Monthly Value', val: `₹${reversibleAmount.toLocaleString('en-IN')}` },
          { icon: <ArrowDownLeft size={22} />, bg: '#fef3c7', color: '#d97706', label: 'Filter Mode', val: rollbackType === 'Basic' ? 'Basic Pay' : 'Allowance Heads' },
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

      {/* CONTROLS CARD */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '24px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: rollbackType === 'Basic' ? '#e11d48' : '#64748b' }}>
            <input
              type="radio"
              name="rbOption"
              checked={rollbackType === 'Basic'}
              onChange={() => setRollbackType('Basic')}
              style={{ accentColor: '#e11d48' }}
            /> Roll Back For Basic
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: rollbackType === 'Head' ? '#e11d48' : '#64748b' }}>
            <input
              type="radio"
              name="rbOption"
              checked={rollbackType === 'Head'}
              onChange={() => setRollbackType('Head')}
              style={{ accentColor: '#e11d48' }}
            /> Roll Back For Head (DA / TA / HRA)
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ width: '320px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Staff Type</label>
            <select
              value={staffType}
              onChange={e => setStaffType(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All Staffs">All Staffs</option>
              <option value="Teaching">Teaching</option>
              <option value="Non-Teaching">Non-Teaching</option>
              <option value="Technical">Technical</option>
              <option value="Support">Support</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={fetchIncrements}
              style={{
                padding: '9px 24px', background: '#159BD7', color: 'white',
                border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer',
                fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px'
              }}
            >
              <Eye size={16} /> View
            </button>
            <button
              onClick={handleReset}
              style={{
                padding: '9px 24px', background: 'white', color: '#eab308',
                border: '1px solid #eab308', borderRadius: '6px', fontWeight: '600',
                cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px'
              }}
            >
              <XCircle size={16} /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>
            Increments Eligible for Rollback ({filteredIncrements.length})
          </div>
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search staff or ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading records...</div>
        ) : filteredIncrements.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            No increments found matching the selected rollback criteria ({rollbackType === 'Basic' ? 'Basic Pay' : 'Allowance Heads'}).
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  {['#', 'Staff Details', 'Department & Role', 'Increment Head', 'Effective Month', 'Original Base', 'Increment Amount', 'Current Salary', 'Status', 'Rollback Action'].map((h, i) => (
                    <th key={i} style={{ padding: '12px 14px', fontWeight: '600', textAlign: ['Original Base', 'Increment Amount', 'Current Salary'].includes(h) ? 'right' : 'left' }}>{h}</th>
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
                        <div style={{ fontSize: '11px', color: '#64748b' }}>ID: {r.employeeId} | {r.staffType}</div>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>
                        <div>{r.department}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{r.designation}</div>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ background: '#fef2f2', color: '#dc2626', padding: '3px 9px', borderRadius: '12px', fontWeight: '600', fontSize: '12px' }}>
                          {r.incrementType}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{r.incrementAppliedFrom}</td>
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
                              padding: '6px 12px', background: '#dc2626', color: 'white',
                              border: 'none', borderRadius: '6px', fontSize: '12px',
                              fontWeight: '600', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px',
                              boxShadow: '0 2px 4px rgba(220, 38, 38, 0.2)'
                            }}
                          >
                            <RotateCcw size={13} /> Rollback Now
                          </button>
                        ) : (
                          <span style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>Already Rolled Back</span>
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

      {/* CONFIRMATION MODAL */}
      {rollbackTarget && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '12px', width: '100%', maxWidth: '450px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: '#dc2626' }}>
              <ShieldAlert size={30} />
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Confirm Increment Reversal</h3>
            </div>
            <p style={{ margin: '0 0 16px', fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
              You are about to rollback the <strong>{rollbackTarget.incrementType}</strong> increment of <strong>+₹{(rollbackTarget.incrementAmount || 0).toLocaleString('en-IN')}</strong> for:
            </p>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>{rollbackTarget.staffName} ({rollbackTarget.employeeId})</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Department: {rollbackTarget.department}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                Revised Salary ₹{(rollbackTarget.newAmount || 0).toLocaleString('en-IN')} ➔ <strong>Reverted Salary: ₹{(rollbackTarget.previousAmount || 0).toLocaleString('en-IN')}</strong>
              </div>
            </div>
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
                {rollingBack ? 'Reverting...' : 'Confirm Rollback'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
