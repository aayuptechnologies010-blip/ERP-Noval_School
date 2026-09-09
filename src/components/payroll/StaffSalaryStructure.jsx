import React, { useState, useEffect } from 'react';
import {
  Layers, Eye, XCircle, Download, Search, CheckCircle,
  AlertCircle, Sparkles, Users, DollarSign, ShieldCheck,
  FileText, ArrowRight, X, ChevronRight
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function StaffSalaryStructure() {
  const [structures, setStructures] = useState([]);
  const [salaryAccounts, setSalaryAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [search, setSearch] = useState('');

  // Filters matching mockup
  const [accountName, setAccountName] = useState('Select Account');
  const [employeeType, setEmployeeType] = useState('All Employee Types');
  const [salaryGroup, setSalaryGroup] = useState('All Group');

  // Detail Modal
  const [selectedStaff, setSelectedStaff] = useState(null);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotif = (type, text) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const fetchStructures = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (accountName && accountName !== 'Select Account' && accountName !== 'All Accounts') {
        params.append('salaryAccount', accountName);
      }
      if (employeeType && employeeType !== 'All Employee Types' && employeeType !== 'All') {
        params.append('staffType', employeeType);
      }
      if (salaryGroup && salaryGroup !== 'All Group' && salaryGroup !== 'All') {
        params.append('salaryGroup', salaryGroup);
      }
      if (search) params.append('search', search);

      const res = await fetch(`${API_BASE}/api/salary-structure/staff-salary-structure?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setStructures(Array.isArray(data) ? data : []);
      }

      // Fetch accounts
      const aRes = await fetch(`${API_BASE}/api/salary-accounts`, { headers });
      if (aRes.ok) {
        const aData = await aRes.json();
        setSalaryAccounts(Array.isArray(aData) ? aData : []);
      }
    } catch (err) {
      console.error('Failed to load staff salary structures:', err);
      showNotif('error', 'Error fetching salary structures');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStructures();
  }, []);

  const handleReset = () => {
    setAccountName('Select Account');
    setEmployeeType('All Employee Types');
    setSalaryGroup('All Group');
    setSearch('');
    setTimeout(() => fetchStructures(), 100);
  };

  const exportCSV = () => {
    if (!structures.length) return;
    const hdrs = [
      '#', 'Employee ID', 'Staff Name', 'Department', 'Designation', 'Staff Type', 'Salary Group',
      'Basic Salary', 'DA', 'HRA', 'TA', 'Special Allowance', 'Gross Salary',
      'PF Deduction', 'ESI Deduction', 'TDS Deduction', 'Insurance Deduction',
      'Total Deductions', 'Net Salary', 'Effective From', 'Status'
    ];
    const rows = structures.map((s, i) => [
      i + 1,
      `"${s.employeeId || ''}"`,
      `"${s.staffName || ''}"`,
      `"${s.department || ''}"`,
      `"${s.designation || ''}"`,
      s.staffType || '',
      s.salaryGroup || '',
      s.basicSalary || 0,
      s.da || 0,
      s.hra || 0,
      s.ta || 0,
      s.specialAllowance || 0,
      s.grossSalary || 0,
      s.pfDeduction || 0,
      s.esiDeduction || 0,
      s.tdsDeduction || 0,
      s.insuranceDeduction || 0,
      s.totalDeductions || 0,
      s.netSalary || 0,
      s.effectiveFrom || '',
      s.status || ''
    ]);
    const csv = 'data:text/csv;charset=utf-8,' + [hdrs.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `Staff_Salary_Structure_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // KPIs
  const totalStaff = structures.length;
  const totalGross = structures.reduce((s, r) => s + (r.grossSalary || 0), 0);
  const totalDeductions = structures.reduce((s, r) => s + (r.totalDeductions || 0), 0);
  const totalNet = structures.reduce((s, r) => s + (r.netSalary || 0), 0);

  const filteredStructures = structures.filter(s => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (s.staffName && s.staffName.toLowerCase().includes(q)) ||
      (s.employeeId && s.employeeId.toLowerCase().includes(q)) ||
      (s.department && s.department.toLowerCase().includes(q)) ||
      (s.salaryGroup && s.salaryGroup.toLowerCase().includes(q))
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
            <Layers size={26} color="#159BD7" />
            Staff Salary Structure
          </h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
            Master breakdown of basic pay, allowances (DA/HRA/TA) and statutory deductions (PF/ESI/TDS) across all employee salary groups.
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
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { icon: <Users size={22} />, bg: '#eff6ff', color: '#159BD7', label: 'Configured Staff', val: totalStaff },
          { icon: <DollarSign size={22} />, bg: '#f0fdf4', color: '#16a34a', label: 'Total Monthly Gross', val: `₹${totalGross.toLocaleString('en-IN')}` },
          { icon: <ShieldCheck size={22} />, bg: '#fff1f2', color: '#e11d48', label: 'Total Deductions', val: `₹${totalDeductions.toLocaleString('en-IN')}` },
          { icon: <CheckCircle size={22} />, bg: '#fdf4ff', color: '#9333ea', label: 'Total Net Payout', val: `₹${totalNet.toLocaleString('en-IN')}` },
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
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Account Name</label>
            <select
              value={accountName}
              onChange={e => setAccountName(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="Select Account">Select Account</option>
              <option value="All Accounts">All Accounts</option>
              <option value="Ayup Salary Account">Ayup Salary Account</option>
              <option value="Ayup Primary Account">Ayup Primary Account</option>
              {salaryAccounts.map(a => (
                <option key={a._id} value={a.accountName}>{a.accountName} ({a.bank})</option>
              ))}
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
              <option value="Teaching">Teaching</option>
              <option value="Non-Teaching">Non-Teaching</option>
              <option value="Technical">Technical</option>
              <option value="Support">Support</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Salary Group</label>
            <select
              value={salaryGroup}
              onChange={e => setSalaryGroup(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All Group">All Group</option>
              <option value="Group-A">Group-A (Faculty & Executive)</option>
              <option value="Group-B">Group-B (Admin & Technical)</option>
              <option value="Group-C">Group-C (Support & Field)</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button
            onClick={fetchStructures}
            style={{
              backgroundColor: '#159BD7', color: 'white', border: 'none',
              padding: '9px 30px', borderRadius: '6px', display: 'flex', alignItems: 'center',
              gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px',
              boxShadow: '0 2px 6px rgba(21, 155, 215, 0.3)'
            }}
          >
            <Eye size={16} /> View Structure
          </button>
          <button
            onClick={exportCSV}
            style={{
              backgroundColor: 'white', color: '#159BD7', border: '1px solid #159BD7',
              padding: '9px 30px', borderRadius: '6px', display: 'flex', alignItems: 'center',
              gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px'
            }}
          >
            <Download size={16} /> Export
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

      {/* SALARY STRUCTURE TABLE */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>
            Configured Salary Structures ({filteredStructures.length})
          </div>
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search staff, group, or department..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading salary structures...</div>
        ) : filteredStructures.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No salary structure records found matching your filters.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  {['#', 'Staff Details', 'Group & Role', 'Basic Salary', 'DA', 'HRA', 'TA & Sp.', 'Gross Salary', 'Total Deduct.', 'Net Salary', 'Effective', 'Details'].map((h, i) => (
                    <th key={i} style={{ padding: '12px 14px', fontWeight: '600', textAlign: ['Basic Salary', 'DA', 'HRA', 'TA & Sp.', 'Gross Salary', 'Total Deduct.', 'Net Salary'].includes(h) ? 'right' : 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredStructures.map((s, i) => {
                  const isAyup = s.staffName?.toLowerCase().includes('ayup');
                  const otherAllowances = (s.ta || 0) + (s.specialAllowance || 0);
                  return (
                    <tr key={s._id || i} style={{ borderBottom: '1px solid #f1f5f9', background: isAyup ? '#fffbeb' : 'transparent' }}>
                      <td style={{ padding: '12px 14px', color: '#64748b' }}>{i + 1}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '600', color: '#0f172a' }}>{s.staffName}</span>
                          {isAyup && (
                            <span style={{ background: '#d97706', color: 'white', fontSize: '10px', padding: '2px 7px', borderRadius: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                              <Sparkles size={10} /> Ayup Tech
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>ID: {s.employeeId} | {s.department}</div>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>
                          {s.salaryGroup}
                        </span>
                        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>{s.designation}</div>
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#334155' }}>
                        ₹{(s.basicSalary || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#334155' }}>
                        ₹{(s.da || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#334155' }}>
                        ₹{(s.hra || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#334155' }}>
                        ₹{otherAllowances.toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '700', color: '#0f172a' }}>
                        ₹{(s.grossSalary || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#e11d48', fontWeight: '600' }}>
                        -₹{(s.totalDeductions || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '700', color: '#16a34a', fontSize: '14px' }}>
                        ₹{(s.netSalary || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', color: '#64748b', fontSize: '12px' }}>
                        {s.effectiveFrom}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <button
                          onClick={() => setSelectedStaff(s)}
                          style={{
                            padding: '5px 10px', background: 'white', color: '#159BD7',
                            border: '1px solid #159BD7', borderRadius: '6px', fontSize: '11px',
                            fontWeight: '600', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '3px'
                          }}
                        >
                          <Eye size={12} /> View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL: SALARY BREAKDOWN SLIP */}
      {selectedStaff && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '12px', width: '100%', maxWidth: '600px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
                  Salary Structure Card — {selectedStaff.staffName}
                </h3>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  ID: {selectedStaff.employeeId} | Group: {selectedStaff.salaryGroup} | Account: {selectedStaff.salaryAccount}
                </div>
              </div>
              <button onClick={() => setSelectedStaff(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              {/* Earnings */}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#16a34a', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>EARNINGS (₹)</span>
                  <span>AMOUNT</span>
                </div>
                {[
                  ['Basic Salary', selectedStaff.basicSalary],
                  ['Dearness Allowance (DA)', selectedStaff.da],
                  ['House Rent Allowance (HRA)', selectedStaff.hra],
                  ['Transport Allowance (TA)', selectedStaff.ta],
                  ['Special Allowance', selectedStaff.specialAllowance],
                ].map(([k, v], i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#334155', padding: '4px 0', borderBottom: '1px dashed #e2e8f0' }}>
                    <span>{k}</span>
                    <span style={{ fontWeight: '600' }}>₹{(v || 0).toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', color: '#0f172a', paddingTop: '8px', marginTop: '4px' }}>
                  <span>Gross Salary:</span>
                  <span>₹{(selectedStaff.grossSalary || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Deductions */}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#e11d48', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>DEDUCTIONS (₹)</span>
                  <span>AMOUNT</span>
                </div>
                {[
                  ['Provident Fund (PF)', selectedStaff.pfDeduction],
                  ['ESI Deduction', selectedStaff.esiDeduction],
                  ['TDS (Income Tax)', selectedStaff.tdsDeduction],
                  ['Insurance Contribution', selectedStaff.insuranceDeduction],
                ].map(([k, v], i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#334155', padding: '4px 0', borderBottom: '1px dashed #e2e8f0' }}>
                    <span>{k}</span>
                    <span style={{ fontWeight: '600', color: '#b91c1c' }}>-₹{(v || 0).toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', color: '#e11d48', paddingTop: '8px', marginTop: '4px' }}>
                  <span>Total Deductions:</span>
                  <span>-₹{(selectedStaff.totalDeductions || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Net Salary Summary */}
            <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)', color: 'white', padding: '16px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>Net Monthly Take-Home Pay</div>
                <div style={{ fontSize: '20px', fontWeight: '700' }}>₹{(selectedStaff.netSalary || 0).toLocaleString('en-IN')}</div>
              </div>
              <div style={{ fontSize: '12px', textAlign: 'right', opacity: 0.85 }}>
                Effective Date: {selectedStaff.effectiveFrom}<br />Status: {selectedStaff.status}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button
                onClick={() => setSelectedStaff(null)}
                style={{ padding: '8px 20px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
