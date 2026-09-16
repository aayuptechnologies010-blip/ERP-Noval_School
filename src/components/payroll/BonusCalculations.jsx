import React, { useState, useEffect } from 'react';
import { Eye, XCircle, Download, Plus, X, CheckCircle, AlertCircle, Sparkles, Gift, DollarSign, Users, Calendar, Percent, RefreshCw } from 'lucide-react';
const MONTHS = ['Jan-2026', 'Feb-2026', 'Mar-2026', 'Apr-2026', 'May-2026', 'Jun-2026', 'Jul-2026', 'Aug-2026', 'Sep-2026', 'Oct-2026', 'Nov-2026', 'Dec-2026'];
const STAFF_TYPES = ['All', 'Teaching', 'Non-Teaching', 'Administrative', 'Support', 'Contract'];


const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function BonusCalculations() {
  const [bonuses, setBonuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  // Filters
  const [staffType, setStaffType] = useState('All');
  const [financialYear, setFinancialYear] = useState('2026-2027');
  const [payableMonth, setPayableMonth] = useState('Select');
  const [calcYear, setCalcYear] = useState('2026');
  const [calcMonth, setCalcMonth] = useState('August');
  const [calcDay, setCalcDay] = useState('30');
  const [toBePaidIn, setToBePaidIn] = useState('Select');
  const [searchTerm, setSearchTerm] = useState('');

  // Form
  const [form, setForm] = useState({
    staffName: 'Ayup Tech',
    employeeId: 'EMP-AT-2026',
    staffType: 'Teaching',
    department: 'Information Technology',
    financialYear: '2026-2027',
    periodFrom: 'Apr-2026',
    periodTo: 'Mar-2027',
    payableMonth: 'Aug-2026',
    eligibleWages: '84000',
    bonusPercentage: '8.33',
    remarks: 'Statutory annual bonus'
  });

  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  const showNotif = (type, text) => { setStatusMsg({ type, text }); setTimeout(() => setStatusMsg(null), 4000); };

  const fetchBonuses = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (staffType && staffType !== 'All') params.append('staffType', staffType);
      if (financialYear && financialYear !== 'All') params.append('financialYear', financialYear);
      if (payableMonth && payableMonth !== 'Select') params.append('payableMonth', payableMonth);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`${API_BASE}/api/salary-structure/bonus?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setBonuses(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to load bonuses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBonuses(); }, []);

  const handleCalculate = async () => {
    if (!form.staffName) { showNotif('error', 'Staff Name is required.'); return; }
    try {
      setCalculating(true);
      const res = await fetch(`${API_BASE}/api/salary-structure/bonus`, {
        method: 'POST', headers, body: JSON.stringify(form)
      });
      if (res.ok) {
        const data = await res.json();
        showNotif('success', `Bonus of ₹${(data.bonusAmount || 0).toLocaleString('en-IN')} calculated for ${data.staffName}!`);
        setShowModal(false);
        fetchBonuses();
      } else {
        const err = await res.json();
        showNotif('error', err.message || 'Calculation failed.');
      }
    } catch (err) {
      showNotif('error', 'Server error during bonus calculation.');
    } finally {
      setCalculating(false);
    }
  };

  const filteredBonuses = bonuses.filter(b =>
    !searchTerm ||
    b.staffName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBonus = filteredBonuses.reduce((s, b) => s + (Number(b.bonusAmount) || 0), 0);
  const totalWages = filteredBonuses.reduce((s, b) => s + (Number(b.eligibleWages) || 0), 0);
  const approved = filteredBonuses.filter(b => b.status === 'Approved').length;

  const exportCSV = () => {
    if (!filteredBonuses.length) return;
    const hdrs = ['#', 'Employee ID', 'Staff Name', 'Staff Type', 'Department', 'Financial Year', 'Period', 'Payable Month', 'Eligible Wages (₹)', 'Bonus %', 'Bonus Amount (₹)', 'Status'];
    const rows = filteredBonuses.map((b, i) => [
      i + 1, `"${b.employeeId}"`, `"${b.staffName}"`, `"${b.staffType}"`, `"${b.department}"`,
      `"${b.financialYear}"`, `"${b.periodFrom} to ${b.periodTo}"`, `"${b.payableMonth}"`,
      b.eligibleWages, b.bonusPercentage, b.bonusAmount, `"${b.status}"`
    ]);
    const csv = 'data:text/csv;charset=utf-8,' + [hdrs.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `Bonus_Calculations_${financialYear}.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  return (
    <div className="global-settings-container" style={{ padding: '24px', background: '#f8fafc', minHeight: '100vh' }}>

      {/* NOTIFICATION */}
      {statusMsg && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999, padding: '12px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', fontSize: '13px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', background: statusMsg.type === 'success' ? '#ecfdf5' : '#fef2f2', color: statusMsg.type === 'success' ? '#065f46' : '#991b1b', border: `1px solid ${statusMsg.type === 'success' ? '#6ee7b7' : '#fca5a5'}` }}>
          {statusMsg.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />} {statusMsg.text}
        </div>
      )}

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Gift size={26} color="#159BD7" />
            Bonus Calculations — Payment of Bonus Act, 1965
          </h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
            Statutory annual bonus calculator (minimum 8.33% to maximum 20% of eligible wages).
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={exportCSV} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', background: 'white', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
            <Download size={16} /> Export CSV
          </button>
          <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', background: '#159BD7', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
            <Plus size={16} /> Calculate Bonus
          </button>
        </div>
      </div>

      {/* BONUS INFO BANNER */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Minimum Statutory Bonus', val: '8.33%', sub: 'of Basic Salary (1 month wages)', color: '#d97706', bg: '#fef3c7' },
          { label: 'Maximum Statutory Bonus', val: '20%', sub: 'of Basic Salary (statutory cap)', color: '#1d4ed8', bg: '#eff6ff' },
          { label: 'Eligible Wage Ceiling', val: '₹21,000/mo', sub: 'per Payment of Bonus Act, 1965', color: '#059669', bg: '#f0fdf4' },
          { label: 'Bonus Period', val: 'Full Year', sub: `1 Apr 2026 – 31 Mar 2027 | FY ${financialYear}`, color: '#7c3aed', bg: '#fdf4ff' },
        ].map(({ label, val, sub, color, bg }, i) => (
          <div key={i} style={{ background: 'white', borderRadius: '10px', padding: '16px', border: `1px solid ${bg}`, borderLeft: `4px solid ${color}` }}>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '4px' }}>{label}</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color }}>
              {val}
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '20px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'flex-end' }}>
          {[
            { label: 'Staff Type', el: <select value={staffType} onChange={e => setStaffType(e.target.value)} className="settings-input" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>{STAFF_TYPES.map(t => <option key={t} value={t}>{t === 'All' ? 'All Staff Types' : t}</option>)}</select> },
            { label: 'Salary Month From', el: <select value={toBePaidIn} onChange={e => setToBePaidIn(e.target.value)} className="settings-input" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}><option value="Select">Select</option>{MONTHS.map(m => <option key={m} value={m}>{m}</option>)}</select> },
            { label: 'Calculation Date', el: (
              <div style={{ display: 'flex', gap: '6px' }}>
                <select value={calcYear} onChange={e => setCalcYear(e.target.value)} style={{ flex: 1, padding: '8px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}>{['2026', '2027'].map(y => <option key={y}>{y}</option>)}</select>
                <select value={calcMonth} onChange={e => setCalcMonth(e.target.value)} style={{ flex: 2, padding: '8px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}>
                  {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => <option key={m}>{m}</option>)}
                </select>
                <select value={calcDay} onChange={e => setCalcDay(e.target.value)} style={{ flex: 1, padding: '8px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            ) },
            { label: 'To Be Paid In (Month)', el: <select value={payableMonth} onChange={e => setPayableMonth(e.target.value)} className="settings-input" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}><option value="Select">Select</option>{MONTHS.map(m => <option key={m} value={m}>{m}</option>)}</select> },
          ].map(({ label, el }, idx) => (
            <div key={idx} className="form-group">
              <label style={{ fontWeight: '600', fontSize: '12px', color: '#475569', display: 'block', marginBottom: '6px' }}>{label}</label>
              {el}
            </div>
          ))}
          <div style={{ display: 'flex', gap: '10px', paddingTop: '18px' }}>
            <button onClick={fetchBonuses} style={{ backgroundColor: '#159BD7', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
              <Eye size={16} /> View
            </button>
            <button onClick={() => { setStaffType('All'); setPayableMonth('Select'); setToBePaidIn('Select'); setSearchTerm(''); fetchBonuses(); }} style={{ backgroundColor: 'white', color: '#e69b00', border: '1px solid #ffbd59', padding: '8px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
              <XCircle size={16} /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { icon: <Users size={22} />, bg: '#eff6ff', color: '#159BD7', label: 'Total Employees', val: filteredBonuses.length },
          { icon: <CheckCircle size={22} />, bg: '#f0fdf4', color: '#16a34a', label: 'Approved Bonuses', val: approved },
          { icon: <DollarSign size={22} />, bg: '#fef3c7', color: '#d97706', label: 'Total Bonus Payable', val: `₹${totalBonus.toLocaleString('en-IN')}` },
          { icon: <Percent size={22} />, bg: '#fdf4ff', color: '#9333ea', label: 'Total Eligible Wages', val: `₹${totalWages.toLocaleString('en-IN')}` },
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

      {/* TABLE */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Bonus Calculation Records ({filteredBonuses.length})</div>
          <input type="text" placeholder="Search staff, department..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ padding: '6px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', width: '260px' }} />
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading bonus calculations...</div>
        ) : filteredBonuses.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            No bonus records found. Use the "Calculate Bonus" button to get started.<br />
            <button onClick={() => setShowModal(true)} style={{ marginTop: '12px', background: '#159BD7', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>+ Calculate Bonus</button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  {['#', 'Staff Details', 'Staff Type', 'Department', 'Period', 'Payable Month', 'Eligible Wages (₹)', 'Bonus %', 'Bonus Amount (₹)', 'Status'].map((h, i) => (
                    <th key={i} style={{ padding: '12px 16px', fontWeight: '600', textAlign: ['Eligible Wages (₹)', 'Bonus Amount (₹)'].includes(h) ? 'right' : 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredBonuses.map((b, i) => {
                  const isAyup = b.staffName?.toLowerCase().includes('ayup');
                  return (
                    <tr key={b._id || i} style={{ borderBottom: '1px solid #f1f5f9', background: isAyup ? '#fff7ed' : 'transparent' }}>
                      <td style={{ padding: '12px 16px', color: '#64748b' }}>{i + 1}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '600', color: '#0f172a' }}>{b.staffName}</span>
                          {isAyup && <span style={{ background: '#d97706', color: 'white', fontSize: '10px', padding: '2px 7px', borderRadius: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '3px' }}><Sparkles size={10} /> Ayup Tech</span>}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>ID: {b.employeeId}</div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ background: '#f1f5f9', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', color: '#475569' }}>{b.staffType}</span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#475569' }}>{b.department}</td>
                      <td style={{ padding: '12px 16px', fontSize: '12px', color: '#64748b' }}>{b.periodFrom} – {b.periodTo}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>{b.payableMonth}</span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: '#334155' }}>₹{(b.eligibleWages || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span style={{ background: '#fef3c7', color: '#d97706', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>{b.bonusPercentage}%</span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '700', color: '#16a34a', fontSize: '14px' }}>₹{(b.bonusAmount || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ background: b.status === 'Approved' ? '#ecfdf5' : '#fef3c7', color: b.status === 'Approved' ? '#059669' : '#d97706', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle size={12} /> {b.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{ background: '#f8fafc', borderTop: '2px solid #cbd5e1', fontWeight: '700' }}>
                  <td colSpan={6} style={{ padding: '14px 16px', color: '#1e293b' }}>Total Bonus Payable ({filteredBonuses.length} Staff):</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', color: '#334155' }}>₹{totalWages.toLocaleString('en-IN')}</td>
                  <td></td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', color: '#16a34a', fontSize: '15px' }}>₹{totalBonus.toLocaleString('en-IN')}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* CALCULATE MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '12px', width: '100%', maxWidth: '620px', padding: '28px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Gift size={20} color="#159BD7" /> Calculate Staff Bonus
              </h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
            </div>

            {/* Live Preview */}
            {form.eligibleWages && form.bonusPercentage && (
              <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)', padding: '16px 20px', borderRadius: '10px', color: 'white', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '12px', opacity: 0.85 }}>Preview Bonus Amount</div>
                  <div style={{ fontSize: '11px', opacity: 0.7 }}>₹{Number(form.eligibleWages).toLocaleString('en-IN')} × {form.bonusPercentage}% ÷ 100</div>
                </div>
                <div style={{ fontSize: '26px', fontWeight: '800' }}>
                  ₹{Math.round((Number(form.eligibleWages) * Number(form.bonusPercentage)) / 100).toLocaleString('en-IN')}
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {[
                { label: 'Staff Name *', field: 'staffName' },
                { label: 'Employee ID', field: 'employeeId' },
                { label: 'Staff Type', field: 'staffType', select: STAFF_TYPES.slice(1) },
                { label: 'Department', field: 'department' },
                { label: 'Financial Year', field: 'financialYear', select: ['2026-2027', '2025-2026'] },
                { label: 'Period From', field: 'periodFrom', select: MONTHS },
                { label: 'Period To', field: 'periodTo', select: MONTHS },
                { label: 'Payable Month', field: 'payableMonth', select: MONTHS },
                { label: 'Eligible Wages (₹) *', field: 'eligibleWages', num: true },
                { label: 'Bonus Percentage (%) *', field: 'bonusPercentage', num: true },
              ].map(({ label, field, select, num }) => (
                <div key={field}>
                  <label style={{ display: 'block', fontWeight: '600', fontSize: '12px', color: '#475569', marginBottom: '5px' }}>{label}</label>
                  {select ? (
                    <select value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}>
                      <option value="">Select...</option>
                      {select.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type={num ? 'number' : 'text'} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
                  )}
                </div>
              ))}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontWeight: '600', fontSize: '12px', color: '#475569', marginBottom: '5px' }}>Remarks</label>
                <input type="text" value={form.remarks} onChange={e => setForm({ ...form, remarks: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
            </div>

            {/* Bonus % Guide */}
            <div style={{ marginTop: '16px', background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', fontSize: '12px', color: '#64748b' }}>
              <strong>Bonus % Guide:</strong> Minimum statutory = 8.33% | Standard = 10–15% | Maximum statutory = 20%
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={handleCalculate} disabled={calculating} style={{ background: '#159BD7', color: 'white', border: 'none', padding: '9px 24px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <RefreshCw size={16} /> {calculating ? 'Processing...' : 'Calculate & Approve Bonus'}
              </button>
              <button onClick={() => setShowModal(false)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '9px 18px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
