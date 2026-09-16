import React, { useState, useEffect } from 'react';
import { Eye, XCircle, Download, Search, X, CheckCircle, AlertCircle, Sparkles, Award, DollarSign, Users, Calendar, Printer, RefreshCw } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function GratuityCalculations() {
  const [calculations, setCalculations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  // Search / Calculate form
  const [searchName, setSearchName] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  // Calc form
  const [form, setForm] = useState({
    staffName: 'Ayup Tech',
    employeeId: 'EMP-AT-2026',
    department: 'Information Technology',
    designation: 'Senior Fullstack Lead',
    joiningDate: '2018-07-01',
    lastDrawnBasic: '60000',
    lastDrawnDA: '30000',
  });

  const [showCertModal, setShowCertModal] = useState(false);
  const [certData, setCertData] = useState(null);

  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  const showNotif = (type, text) => { setStatusMsg({ type, text }); setTimeout(() => setStatusMsg(null), 4000); };

  const fetchCalculations = async (search = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      const res = await fetch(`${API_BASE}/api/salary-structure/gratuity?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setCalculations(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to load gratuity calculations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCalculations(); }, []);

  const handleSearch = () => { fetchCalculations(searchName); };

  const handleCalculate = async () => {
    if (!form.staffName) { showNotif('error', 'Staff Name is required.'); return; }
    try {
      setCalculating(true);
      const res = await fetch(`${API_BASE}/api/salary-structure/gratuity`, {
        method: 'POST', headers, body: JSON.stringify(form)
      });
      if (res.ok) {
        const data = await res.json();
        showNotif('success', `Gratuity calculated: ₹${(data.gratuityAmount || 0).toLocaleString('en-IN')}`);
        setCertData(data);
        setShowCertModal(true);
        fetchCalculations();
      } else {
        const err = await res.json();
        showNotif('error', err.message || 'Failed to calculate gratuity.');
      }
    } catch (err) {
      showNotif('error', 'Server error during calculation.');
    } finally {
      setCalculating(false);
    }
  };

  const totalGratuity = calculations.reduce((s, c) => s + (Number(c.gratuityAmount) || 0), 0);
  const eligible = calculations.filter(c => c.isEligible).length;

  const exportCSV = () => {
    if (!calculations.length) return;
    const hdrs = ['#', 'Employee ID', 'Staff Name', 'Department', 'Designation', 'Joining Date', 'Years', 'Basic+DA', 'Gratuity Amount', 'Eligible', 'Status'];
    const rows = calculations.map((c, i) => [
      i + 1, `"${c.employeeId}"`, `"${c.staffName}"`, `"${c.department}"`, `"${c.designation}"`,
      c.joiningDate ? new Date(c.joiningDate).toLocaleDateString('en-IN') : '',
      c.completedYears,
      (c.lastDrawnBasic || 0) + (c.lastDrawnDA || 0),
      c.gratuityAmount, c.isEligible ? 'YES' : 'NO', `"${c.status}"`
    ]);
    const csv = 'data:text/csv;charset=utf-8,' + [hdrs.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `Gratuity_Calculations.csv`);
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
            <Award size={26} color="#159BD7" />
            Gratuity Calculations — Payment of Gratuity Act, 1972
          </h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
            Calculate statutory gratuity using the formula: <strong>(15 × (Basic + DA) × Years) ÷ 26</strong>. Capped at ₹20 Lakh.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={exportCSV} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', background: 'white', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* FORMULA BANNER */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Award size={22} />
          <span style={{ fontSize: '16px', fontWeight: '700' }}>Gratuity Formula</span>
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: '18px', fontWeight: '700', letterSpacing: '0.5px', background: 'rgba(255,255,255,0.15)', display: 'inline-block', padding: '10px 20px', borderRadius: '8px' }}>
          Gratuity = (15 × (Basic + DA) × Completed Years) ÷ 26
        </div>
        <p style={{ margin: '10px 0 0', opacity: 0.85, fontSize: '12px' }}>
          Eligibility: Minimum 5 years of continuous service. Maximum statutory gratuity: ₹20,00,000.
        </p>
      </div>

      {/* SEARCH + CALCULATE PANEL */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Enter / Search Staff Name (e.g. Ayup Tech)..."
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            style={{ flex: 1, minWidth: '260px', padding: '9px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
          />
          <button onClick={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 20px', background: '#159BD7', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
            <Search size={16} /> Search
          </button>
          <button onClick={() => { setSearchName(''); fetchCalculations(); }} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: 'white', color: '#e69b00', border: '1px solid #ffbd59', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
            <XCircle size={16} /> Reset
          </button>
        </div>

        {/* Calculate new form */}
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: '700', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RefreshCw size={16} color="#159BD7" /> Calculate Gratuity for Staff
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            {[
              { label: 'Staff Name *', field: 'staffName' },
              { label: 'Employee ID', field: 'employeeId' },
              { label: 'Department', field: 'department' },
              { label: 'Designation', field: 'designation' },
              { label: 'Joining Date *', field: 'joiningDate', date: true },
              { label: 'Last Drawn Basic (₹) *', field: 'lastDrawnBasic', num: true },
              { label: 'Last Drawn DA (₹) *', field: 'lastDrawnDA', num: true },
            ].map(({ label, field, date: isDate, num }) => (
              <div key={field}>
                <label style={{ display: 'block', fontWeight: '600', fontSize: '12px', color: '#475569', marginBottom: '5px' }}>{label}</label>
                <input
                  type={isDate ? 'date' : num ? 'number' : 'text'}
                  value={form[field]}
                  onChange={e => setForm({ ...form, [field]: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>
            ))}
          </div>
          <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
            <button
              onClick={handleCalculate}
              disabled={calculating}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 24px', background: '#1d4ed8', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
            >
              <Eye size={16} /> {calculating ? 'Calculating...' : 'Calculate & Generate Certificate'}
            </button>
          </div>
        </div>
      </div>

      {/* KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { icon: <Users size={22} />, bg: '#eff6ff', color: '#159BD7', label: 'Total Calculations', val: calculations.length },
          { icon: <CheckCircle size={22} />, bg: '#f0fdf4', color: '#16a34a', label: 'Eligible (≥5 Years)', val: eligible },
          { icon: <DollarSign size={22} />, bg: '#fef3c7', color: '#d97706', label: 'Total Gratuity Payable', val: `₹${totalGratuity.toLocaleString('en-IN')}` },
          { icon: <Calendar size={22} />, bg: '#fdf4ff', color: '#9333ea', label: 'Statutory Cap', val: '₹20,00,000' },
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
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Gratuity Calculation History ({calculations.length})</div>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading gratuity calculations...</div>
        ) : calculations.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No gratuity calculations found. Use the form above to calculate.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  {['#', 'Staff Details', 'Department', 'Joining Date', 'Service Years', 'Basic + DA', 'Gratuity Payable', 'Eligible', 'Status', 'Certificate'].map((h, i) => (
                    <th key={i} style={{ padding: '12px 16px', fontWeight: '600', textAlign: ['Gratuity Payable', 'Basic + DA'].includes(h) ? 'right' : 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {calculations.map((c, i) => {
                  const isAyup = c.staffName?.toLowerCase().includes('ayup');
                  const wage = (c.lastDrawnBasic || 0) + (c.lastDrawnDA || 0);
                  return (
                    <tr key={c._id || i} style={{ borderBottom: '1px solid #f1f5f9', background: isAyup ? '#fffbeb' : 'transparent' }}>
                      <td style={{ padding: '12px 16px', color: '#64748b' }}>{i + 1}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '600', color: '#0f172a' }}>{c.staffName}</span>
                          {isAyup && <span style={{ background: '#d97706', color: 'white', fontSize: '10px', padding: '2px 7px', borderRadius: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '3px' }}><Sparkles size={10} /> Ayup Tech</span>}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>ID: {c.employeeId} | {c.designation}</div>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#475569' }}>{c.department}</td>
                      <td style={{ padding: '12px 16px', color: '#475569' }}>{c.joiningDate ? new Date(c.joiningDate).toLocaleDateString('en-IN') : '—'}</td>
                      <td style={{ padding: '12px 16px', fontWeight: '700', color: '#1d4ed8', textAlign: 'center' }}>
                        <span style={{ background: '#eff6ff', padding: '3px 10px', borderRadius: '12px' }}>{c.completedYears} yrs</span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: '#334155' }}>₹{wage.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '700', color: '#16a34a', fontSize: '14px' }}>₹{(c.gratuityAmount || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ background: c.isEligible ? '#ecfdf5' : '#fef2f2', color: c.isEligible ? '#059669' : '#ef4444', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>
                          {c.isEligible ? '✓ Eligible' : '✗ Not Eligible'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ background: '#ecfdf5', color: '#059669', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle size={12} /> {c.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <button
                          onClick={() => { setCertData(c); setShowCertModal(true); }}
                          style={{ background: 'none', border: '1px solid #e2e8f0', color: '#1d4ed8', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Printer size={12} /> Certificate
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{ background: '#f8fafc', borderTop: '2px solid #cbd5e1', fontWeight: '700' }}>
                  <td colSpan={6} style={{ padding: '14px 16px', color: '#1e293b' }}>Total Gratuity Liability ({calculations.length} Staff | {eligible} Eligible):</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', color: '#16a34a', fontSize: '15px' }}>₹{totalGratuity.toLocaleString('en-IN')}</td>
                  <td colSpan={3}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* GRATUITY CERTIFICATE MODAL */}
      {showCertModal && certData && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '12px', width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto', padding: '30px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Award size={24} color="#1d4ed8" />
                <h3 style={{ margin: 0, color: '#0f172a', fontSize: '18px' }}>Gratuity Certificate</h3>
              </div>
              <button onClick={() => setShowCertModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
            </div>

            <div style={{ border: '2px solid #1d4ed8', padding: '30px', borderRadius: '10px', background: '#fff' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: 'white' }}>
                  <Award size={28} />
                </div>
                <h2 style={{ margin: 0, color: '#1e3a8a', fontSize: '22px', fontWeight: '800' }}>NOVAL INTERNATIONAL ACADEMY</h2>
                <p style={{ margin: '4px 0', color: '#64748b', fontSize: '12px' }}>CERTIFICATE OF GRATUITY CALCULATION</p>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '11px' }}>Under the Payment of Gratuity Act, 1972</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
                {[
                  { label: 'Employee Name', val: certData.staffName },
                  { label: 'Employee ID', val: certData.employeeId },
                  { label: 'Department', val: certData.department },
                  { label: 'Designation', val: certData.designation },
                  { label: 'Date of Joining', val: certData.joiningDate ? new Date(certData.joiningDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : '—' },
                  { label: 'Years of Service', val: `${certData.completedYears} years` },
                  { label: 'Last Basic Salary', val: `₹${(certData.lastDrawnBasic || 0).toLocaleString('en-IN')}` },
                  { label: 'Last Dearness Allowance', val: `₹${(certData.lastDrawnDA || 0).toLocaleString('en-IN')}` },
                  { label: 'Wage (Basic + DA)', val: `₹${((certData.lastDrawnBasic || 0) + (certData.lastDrawnDA || 0)).toLocaleString('en-IN')}` },
                  { label: 'Eligibility Status', val: certData.isEligible ? '✓ ELIGIBLE' : '✗ NOT ELIGIBLE' },
                ].map(({ label, val }, i) => (
                  <div key={i} style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '6px' }}>
                    <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', marginTop: '2px' }}>{val}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)', padding: '20px', borderRadius: '10px', color: 'white', textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '6px' }}>Calculated Gratuity Amount</div>
                <div style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '0.5px' }}>₹{(certData.gratuityAmount || 0).toLocaleString('en-IN')}</div>
                <div style={{ fontSize: '12px', opacity: 0.75, marginTop: '6px' }}>= (15 × ₹{((certData.lastDrawnBasic || 0) + (certData.lastDrawnDA || 0)).toLocaleString('en-IN')} × {certData.completedYears}) ÷ 26</div>
              </div>

              {certData.remarks && (
                <div style={{ background: '#f1f5f9', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', color: '#475569' }}>
                  <strong>Remarks:</strong> {certData.remarks}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px', borderTop: '1px dashed #cbd5e1' }}>
                {['HR Manager', 'Finance Controller', 'Principal'].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ borderBottom: '1px solid #64748b', width: '120px', marginBottom: '6px' }}></div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#334155' }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => window.print()} style={{ background: '#1d4ed8', color: 'white', border: 'none', padding: '9px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Printer size={16} /> Print Certificate
              </button>
              <button onClick={() => setShowCertModal(false)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '9px 18px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
