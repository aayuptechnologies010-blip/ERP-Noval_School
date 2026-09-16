import React, { useState, useEffect } from 'react';
import { Eye, XCircle, Download, Plus, X, CheckCircle, AlertCircle, Sparkles, BookOpen, DollarSign, Users, ShieldCheck, Edit3 } from 'lucide-react';
const IT_SECTIONS = [
  { section: 'Section 80C', description: 'PF, PPF, ELSS, LIC, NSC, Tuition Fees', limit: 150000 },
  { section: 'Section 80D', description: 'Health Insurance Premium (Self & Family)', limit: 25000 },
  { section: 'Section 80G', description: 'Donations to Approved Charitable Funds', limit: null },
  { section: 'Section 80E', description: 'Interest on Education Loan', limit: null },
  { section: 'Section 80CCD', description: 'NPS Contribution (Additional ₹50,000)', limit: 50000 },
  { section: 'HRA Exemption', description: 'House Rent Allowance (Section 10-13A)', limit: null },
  { section: 'Section 24B', description: 'Interest on Home Loan', limit: 200000 },
  { section: 'Section 80TTA', description: 'Interest on Savings Account', limit: 10000 },
];


const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function ITHeadEntry() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  // Filters
  const [financialYear, setFinancialYear] = useState('2026-2027');
  const [schoolBank, setSchoolBank] = useState('All');
  const [salaryAccNo, setSalaryAccNo] = useState('All');
  const [staffType, setStaffType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Form state
  const [form, setForm] = useState({
    staffName: 'Ayup Tech', employeeId: 'EMP-AT-2026', financialYear: '2026-2027',
    itSection: '', declaredAmount: '', verifiedAmount: '', remarks: ''
  });
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  const showNotif = (type, text) => { setStatusMsg({ type, text }); setTimeout(() => setStatusMsg(null), 4000); };

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (financialYear && financialYear !== 'All') params.append('financialYear', financialYear);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`${API_BASE}/api/salary-structure/it-head-entries?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setEntries(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to load IT head entries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEntries(); }, []);

  const handleSave = async () => {
    if (!form.staffName || !form.itSection || !form.declaredAmount) {
      showNotif('error', 'Staff Name, IT Section and Declared Amount are required.');
      return;
    }
    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/api/salary-structure/it-head-entries`, {
        method: 'POST', headers, body: JSON.stringify(form)
      });
      if (res.ok) {
        showNotif('success', 'IT Head Entry saved successfully!');
        setShowAddModal(false);
        setForm({ staffName: 'Ayup Tech', employeeId: 'EMP-AT-2026', financialYear: '2026-2027', itSection: '', declaredAmount: '', verifiedAmount: '', remarks: '' });
        fetchEntries();
      } else {
        const err = await res.json();
        showNotif('error', err.message || 'Failed to save entry.');
      }
    } catch (err) {
      showNotif('error', 'Server error.');
    } finally {
      setSaving(false);
    }
  };

  const filteredEntries = entries.filter(e =>
    !searchTerm ||
    e.staffName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.itSection?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.employeeId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDeclared = filteredEntries.reduce((s, e) => s + (Number(e.declaredAmount) || 0), 0);
  const totalVerified = filteredEntries.reduce((s, e) => s + (Number(e.verifiedAmount) || 0), 0);
  const totalBenefit = filteredEntries.reduce((s, e) => s + (Number(e.taxSavingBenefit) || 0), 0);

  const exportCSV = () => {
    if (!filteredEntries.length) return;
    const hdrs = ['#', 'Employee ID', 'Staff Name', 'Financial Year', 'IT Section', 'Description', 'Declared (INR)', 'Verified (INR)', 'Tax Benefit (INR)', 'Status'];
    const rows = filteredEntries.map((e, i) => [
      i + 1, `"${e.employeeId}"`, `"${e.staffName}"`, `"${e.financialYear}"`,
      `"${e.itSection}"`, `"${e.description || ''}"`,
      e.declaredAmount, e.verifiedAmount, e.taxSavingBenefit, `"${e.status}"`
    ]);
    const csv = 'data:text/csv;charset=utf-8,' + [hdrs.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `IT_Head_Entries_${financialYear}.csv`);
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
            <BookOpen size={26} color="#159BD7" />
            IT Head Entry — Investment Declaration Register
          </h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
            Staff income tax investment declarations (80C, 80D, HRA, etc.) for TDS computation.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={exportCSV} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', background: 'white', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
            <Download size={16} /> Export CSV
          </button>
          <button onClick={() => setShowAddModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', background: '#159BD7', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
            <Plus size={16} /> Add IT Entry
          </button>
        </div>
      </div>

      {/* FILTER PANEL */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '20px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'flex-end' }}>
          {[
            { label: 'School Bank', el: <select value={schoolBank} onChange={e => setSchoolBank(e.target.value)} className="settings-input" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}><option value="All">All School Banks</option><option value="HDFC Bank">HDFC Bank</option><option value="SBI">SBI</option></select> },
            { label: 'Salary A/c No.', el: <select value={salaryAccNo} onChange={e => setSalaryAccNo(e.target.value)} className="settings-input" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}><option value="All">All Salary A/C</option><option value="Ayup Salary Account">Ayup Salary Account</option></select> },
            { label: 'Staff Type', el: <select value={staffType} onChange={e => setStaffType(e.target.value)} className="settings-input" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}><option value="All">All Staff Types (13)</option><option value="Teaching">Teaching</option><option value="Non-Teaching">Non-Teaching</option><option value="Administrative">Administrative</option></select> },
            { label: 'Financial Year', el: <select value={financialYear} onChange={e => setFinancialYear(e.target.value)} className="settings-input" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}><option value="2026-2027">2026 – 2027</option><option value="2025-2026">2025 – 2026</option></select> },
          ].map(({ label, el }, idx) => (
            <div key={idx} className="form-group">
              <label style={{ fontWeight: '600', fontSize: '12px', color: '#475569', display: 'block', marginBottom: '6px' }}>{label}</label>
              {el}
            </div>
          ))}
          <div style={{ display: 'flex', gap: '10px', paddingTop: '18px' }}>
            <button onClick={fetchEntries} style={{ backgroundColor: '#159BD7', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
              <Eye size={16} /> View
            </button>
            <button onClick={() => { setSchoolBank('All'); setSalaryAccNo('All'); setStaffType('All'); setFinancialYear('2026-2027'); setSearchTerm(''); fetchEntries(); }} style={{ backgroundColor: 'white', color: '#e69b00', border: '1px solid #ffbd59', padding: '8px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
              <XCircle size={16} /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { icon: <Users size={22} />, bg: '#eff6ff', color: '#159BD7', label: 'Total Declarations', val: filteredEntries.length },
          { icon: <DollarSign size={22} />, bg: '#fef3c7', color: '#d97706', label: 'Total Declared', val: `₹${totalDeclared.toLocaleString('en-IN')}` },
          { icon: <ShieldCheck size={22} />, bg: '#f0fdf4', color: '#16a34a', label: 'Total Verified', val: `₹${totalVerified.toLocaleString('en-IN')}` },
          { icon: <CheckCircle size={22} />, bg: '#fdf4ff', color: '#9333ea', label: 'Estimated Tax Benefit', val: `₹${totalBenefit.toLocaleString('en-IN')}` },
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

      {/* IT SECTIONS QUICK REFERENCE */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>📋 Eligible IT Sections Quick Reference</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '10px' }}>
          {IT_SECTIONS.map((s, i) => (
            <div key={i} style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
              <div>
                <div style={{ fontWeight: '700', fontSize: '13px', color: '#1e293b' }}>{s.section}</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{s.description}</div>
              </div>
              {s.limit && <span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', whiteSpace: 'nowrap' }}>₹{(s.limit / 1000)}K</span>}
            </div>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>IT Investment Declaration Records ({filteredEntries.length})</div>
          <input type="text" placeholder="Search staff, IT section..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ padding: '6px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', width: '260px' }} />
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading IT head entries...</div>
        ) : filteredEntries.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            No IT investment declarations found.<br />
            <button onClick={() => setShowAddModal(true)} style={{ marginTop: '12px', background: '#159BD7', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>+ Add First Entry</button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  {['#', 'Staff Details', 'Financial Year', 'IT Section', 'Declared (₹)', 'Verified (₹)', 'Tax Benefit (₹)', 'Status', 'Action'].map((h, i) => (
                    <th key={i} style={{ padding: '12px 16px', fontWeight: '600', textAlign: ['Declared (₹)', 'Verified (₹)', 'Tax Benefit (₹)'].includes(h) ? 'right' : 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((e, i) => {
                  const isAyup = e.staffName?.toLowerCase().includes('ayup');
                  return (
                    <tr key={e._id || i} style={{ borderBottom: '1px solid #f1f5f9', background: isAyup ? '#fdf4ff' : 'transparent' }}>
                      <td style={{ padding: '12px 16px', color: '#64748b' }}>{i + 1}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '600', color: '#0f172a' }}>{e.staffName}</span>
                          {isAyup && <span style={{ background: '#9333ea', color: 'white', fontSize: '10px', padding: '2px 7px', borderRadius: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '3px' }}><Sparkles size={10} /> Ayup Tech</span>}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>ID: {e.employeeId}</div>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#475569' }}>{e.financialYear}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>{e.itSection}</span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: '#d97706' }}>₹{(e.declaredAmount || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: '#334155' }}>₹{(e.verifiedAmount || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '700', color: '#9333ea' }}>₹{(e.taxSavingBenefit || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ background: e.status === 'Verified' ? '#ecfdf5' : '#fef3c7', color: e.status === 'Verified' ? '#059669' : '#d97706', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle size={12} /> {e.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <button style={{ background: 'none', border: '1px solid #e2e8f0', color: '#64748b', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Edit3 size={12} /> Edit
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

      {/* ADD ENTRY MODAL */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '12px', width: '100%', maxWidth: '580px', padding: '28px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={20} color="#159BD7" /> Add IT Investment Declaration
              </h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {[
                { label: 'Staff Name *', field: 'staffName', type: 'input' },
                { label: 'Employee ID', field: 'employeeId', type: 'input' },
                { label: 'Financial Year', field: 'financialYear', type: 'select', opts: ['2026-2027', '2025-2026'] },
                { label: 'IT Section *', field: 'itSection', type: 'select', opts: IT_SECTIONS.map(s => s.section) },
                { label: 'Declared Amount (₹) *', field: 'declaredAmount', type: 'number' },
                { label: 'Verified Amount (₹)', field: 'verifiedAmount', type: 'number' },
              ].map(({ label, field, type, opts }) => (
                <div key={field}>
                  <label style={{ display: 'block', fontWeight: '600', fontSize: '12px', color: '#475569', marginBottom: '5px' }}>{label}</label>
                  {type === 'select' ? (
                    <select value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} className="settings-input" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                      <option value="">Select...</option>
                      {opts.map((o, i) => <option key={i} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type={type === 'number' ? 'number' : 'text'} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} className="settings-input" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                  )}
                </div>
              ))}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontWeight: '600', fontSize: '12px', color: '#475569', marginBottom: '5px' }}>Remarks</label>
                <input type="text" value={form.remarks} onChange={e => setForm({ ...form, remarks: e.target.value })} placeholder="e.g. PPF passbook verified, LIC receipt attached..." className="settings-input" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={handleSave} disabled={saving} style={{ background: '#159BD7', color: 'white', border: 'none', padding: '9px 24px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
                {saving ? 'Saving...' : 'Save Entry'}
              </button>
              <button onClick={() => setShowAddModal(false)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '9px 18px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
