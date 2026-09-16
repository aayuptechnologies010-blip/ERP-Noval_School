import React, { useState, useEffect } from 'react';
import { Eye, XCircle, Download, Plus, X, CheckCircle, AlertCircle, Sparkles, FileText, DollarSign, Users, Hash, Calendar } from 'lucide-react';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function TDSEntry() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  // Filters
  const [monthYear, setMonthYear] = useState('Aug-2026');
  const [schoolBank, setSchoolBank] = useState('All');
  const [date, setDate] = useState('30-Aug-2026');
  const [chequeNo, setChequeNo] = useState('');
  const [challanNo, setChallanNo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Form state
  const [form, setForm] = useState({
    staffName: 'Ayup Tech', employeeId: 'EMP-AT-2026', panNumber: 'AYUPT1234K',
    monthYear: 'Aug-2026', grossSalary: '', taxableSalary: '', tdsAmount: '',
    challanNo: 'CHL-2026-001', bsrCode: '0210042', depositDate: '',
    chequeNo: '', schoolBank: 'HDFC Bank - 50100429188'
  });
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  const showNotif = (type, text) => { setStatusMsg({ type, text }); setTimeout(() => setStatusMsg(null), 4000); };

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (monthYear && monthYear !== 'Select') params.append('monthYear', monthYear);
      if (schoolBank && schoolBank !== 'All') params.append('schoolBank', schoolBank);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`${API_BASE}/api/salary-structure/tds-entries?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setRecords(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to load TDS entries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRecords(); }, []);

  const handleSave = async () => {
    if (!form.staffName || !form.tdsAmount) {
      showNotif('error', 'Staff Name and TDS Amount are required.'); return;
    }
    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/api/salary-structure/tds-entries`, {
        method: 'POST', headers, body: JSON.stringify(form)
      });
      if (res.ok) {
        showNotif('success', 'TDS entry recorded successfully!');
        setShowAddModal(false);
        setForm({ staffName: 'Ayup Tech', employeeId: 'EMP-AT-2026', panNumber: 'AYUPT1234K', monthYear: 'Aug-2026', grossSalary: '', taxableSalary: '', tdsAmount: '', challanNo: 'CHL-2026-001', bsrCode: '0210042', depositDate: '', chequeNo: '', schoolBank: 'HDFC Bank - 50100429188' });
        fetchRecords();
      } else {
        const err = await res.json();
        showNotif('error', err.message || 'Failed to save TDS entry.');
      }
    } catch (err) {
      showNotif('error', 'Server error saving TDS entry.');
    } finally {
      setSaving(false);
    }
  };

  const filteredRecords = records.filter(r =>
    !searchTerm ||
    r.staffName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.panNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.challanNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.employeeId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalTDS = filteredRecords.reduce((s, r) => s + (Number(r.tdsAmount) || 0), 0);
  const totalGross = filteredRecords.reduce((s, r) => s + (Number(r.grossSalary) || 0), 0);

  const exportCSV = () => {
    if (!filteredRecords.length) return;
    const hdrs = ['#', 'Employee ID', 'Staff Name', 'PAN Number', 'Month-Year', 'Gross Salary', 'Taxable Salary', 'TDS Amount', 'Challan No', 'BSR Code', 'Deposit Date', 'School Bank', 'Status'];
    const rows = filteredRecords.map((r, i) => [
      i + 1, `"${r.employeeId}"`, `"${r.staffName}"`, `"${r.panNumber}"`, `"${r.monthYear}"`,
      r.grossSalary, r.taxableSalary, r.tdsAmount, `"${r.challanNo}"`,
      `"${r.bsrCode}"`, r.depositDate ? new Date(r.depositDate).toLocaleDateString('en-IN') : '',
      `"${r.schoolBank}"`, `"${r.status}"`
    ]);
    const csv = 'data:text/csv;charset=utf-8,' + [hdrs.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `TDS_Entries_${monthYear}.csv`);
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
            <FileText size={26} color="#159BD7" />
            TDS Entry — Monthly Tax Deduction at Source Register
          </h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
            Monthly TDS challan deposits, BSR codes, PAN-wise tax remittance, and Form 24Q data.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={exportCSV} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', background: 'white', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
            <Download size={16} /> Export CSV
          </button>
          <button onClick={() => setShowAddModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', background: '#159BD7', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
            <Plus size={16} /> Add TDS Entry
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '20px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'flex-end' }}>
          {[
            { label: 'Salary Month-Year', el: <select value={monthYear} onChange={e => setMonthYear(e.target.value)} className="settings-input" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>{MONTHS.map(m => <option key={m} value={`${m}-2026`}>{m} - 2026</option>)}</select> },
            { label: 'School Bank', el: <select value={schoolBank} onChange={e => setSchoolBank(e.target.value)} className="settings-input" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}><option value="All">All School Banks</option><option value="HDFC Bank - 50100429188">HDFC Bank - 50100429188</option><option value="SBI">SBI</option></select> },
            { label: 'Date', el: <input type="text" value={date} onChange={e => setDate(e.target.value)} className="settings-input" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} /> },
            { label: 'Cheque No.', el: <input type="text" placeholder="Optional cheque ref" value={chequeNo} onChange={e => setChequeNo(e.target.value)} className="settings-input" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} /> },
            { label: 'Challan No.', el: <input type="text" placeholder="e.g. CHL-2026-001" value={challanNo} onChange={e => setChallanNo(e.target.value)} className="settings-input" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} /> },
          ].map(({ label, el }, idx) => (
            <div key={idx} className="form-group">
              <label style={{ fontWeight: '600', fontSize: '12px', color: '#475569', display: 'block', marginBottom: '6px' }}>{label}</label>
              {el}
            </div>
          ))}
          <div style={{ display: 'flex', gap: '10px', paddingTop: '18px' }}>
            <button onClick={fetchRecords} style={{ backgroundColor: '#159BD7', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
              <Eye size={16} /> View
            </button>
            <button onClick={() => { setMonthYear('Aug-2026'); setSchoolBank('All'); setChequeNo(''); setChallanNo(''); setSearchTerm(''); fetchRecords(); }} style={{ backgroundColor: 'white', color: '#e69b00', border: '1px solid #ffbd59', padding: '8px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
              <XCircle size={16} /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { icon: <Users size={22} />, bg: '#eff6ff', color: '#159BD7', label: 'Employees with TDS', val: filteredRecords.length },
          { icon: <DollarSign size={22} />, bg: '#fef2f2', color: '#ef4444', label: 'Total TDS Deducted', val: `₹${totalTDS.toLocaleString('en-IN')}` },
          { icon: <Hash size={22} />, bg: '#fef3c7', color: '#d97706', label: 'Total Gross Salary', val: `₹${totalGross.toLocaleString('en-IN')}` },
          { icon: <Calendar size={22} />, bg: '#f1f5f9', color: '#475569', label: 'Statement Month', val: monthYear },
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
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>TDS Challan Deposit Records ({filteredRecords.length})</div>
          <input type="text" placeholder="Search staff, PAN, challan no..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ padding: '6px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', width: '280px' }} />
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading TDS records...</div>
        ) : filteredRecords.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            No TDS entries found for the selected month/bank.<br />
            <button onClick={() => setShowAddModal(true)} style={{ marginTop: '12px', background: '#159BD7', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>+ Add TDS Entry</button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  {['#', 'Staff Details', 'PAN Number', 'Month-Year', 'Gross (₹)', 'Taxable (₹)', 'TDS (₹)', 'Challan No', 'BSR Code', 'Bank', 'Status'].map((h, i) => (
                    <th key={i} style={{ padding: '12px 16px', fontWeight: '600', textAlign: ['Gross (₹)', 'Taxable (₹)', 'TDS (₹)'].includes(h) ? 'right' : 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((r, i) => {
                  const isAyup = r.staffName?.toLowerCase().includes('ayup');
                  return (
                    <tr key={r._id || i} style={{ borderBottom: '1px solid #f1f5f9', background: isAyup ? '#fff7ed' : 'transparent' }}>
                      <td style={{ padding: '12px 16px', color: '#64748b' }}>{i + 1}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '600', color: '#0f172a' }}>{r.staffName}</span>
                          {isAyup && <span style={{ background: '#d97706', color: 'white', fontSize: '10px', padding: '2px 7px', borderRadius: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '3px' }}><Sparkles size={10} /> Ayup Tech</span>}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>ID: {r.employeeId}</div>
                      </td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontWeight: '600', color: '#1e293b', letterSpacing: '0.5px' }}>{r.panNumber}</td>
                      <td style={{ padding: '12px 16px', color: '#475569' }}>{r.monthYear}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: '#334155' }}>₹{(r.grossSalary || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: '#334155' }}>₹{(r.taxableSalary || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '700', color: '#ef4444' }}>₹{(r.tdsAmount || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '12px', color: '#7c3aed', fontWeight: '600' }}>{r.challanNo}</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '12px', color: '#475569' }}>{r.bsrCode}</td>
                      <td style={{ padding: '12px 16px', fontSize: '12px', color: '#64748b' }}>{r.schoolBank?.split(' - ')[0] || 'HDFC'}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ background: '#ecfdf5', color: '#059669', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle size={12} /> {r.status || 'Deposited'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{ background: '#f8fafc', borderTop: '2px solid #cbd5e1', fontWeight: '700' }}>
                  <td colSpan={4} style={{ padding: '14px 16px', color: '#1e293b' }}>Total TDS Liability ({filteredRecords.length} Employees):</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', color: '#334155' }}>₹{totalGross.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', color: '#334155' }}>—</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', color: '#ef4444', fontSize: '15px' }}>₹{totalTDS.toLocaleString('en-IN')}</td>
                  <td colSpan={4}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '12px', width: '100%', maxWidth: '620px', padding: '28px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={20} color="#159BD7" /> Add New TDS Challan Entry
              </h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {[
                { label: 'Staff Name *', field: 'staffName' },
                { label: 'Employee ID', field: 'employeeId' },
                { label: 'PAN Number', field: 'panNumber' },
                { label: 'Month-Year', field: 'monthYear' },
                { label: 'Gross Salary (₹)', field: 'grossSalary', num: true },
                { label: 'Taxable Salary (₹)', field: 'taxableSalary', num: true },
                { label: 'TDS Amount (₹) *', field: 'tdsAmount', num: true },
                { label: 'Challan No.', field: 'challanNo' },
                { label: 'BSR Code', field: 'bsrCode' },
                { label: 'Deposit Date', field: 'depositDate', date: true },
                { label: 'Cheque No.', field: 'chequeNo' },
                { label: 'School Bank', field: 'schoolBank' },
              ].map(({ label, field, num, date: isDate }) => (
                <div key={field}>
                  <label style={{ display: 'block', fontWeight: '600', fontSize: '12px', color: '#475569', marginBottom: '5px' }}>{label}</label>
                  <input
                    type={isDate ? 'date' : num ? 'number' : 'text'}
                    value={form[field]}
                    onChange={e => setForm({ ...form, [field]: e.target.value })}
                    className="settings-input"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={handleSave} disabled={saving} style={{ background: '#159BD7', color: 'white', border: 'none', padding: '9px 24px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
                {saving ? 'Saving...' : 'Save TDS Entry'}
              </button>
              <button onClick={() => setShowAddModal(false)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '9px 18px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
