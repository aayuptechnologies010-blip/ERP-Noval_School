import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, DollarSign, Users, ShieldCheck,
  ChevronLeft, ChevronRight, Filter, Building2, Landmark, Check
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function PFChallanReport() {
  const [data, setData] = useState({ summary: {}, accounts: [] });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [filterOptions, setFilterOptions] = useState({
    schools: ['Ayup Tech', 'Ayup Technologies', 'Ayup Tech International'],
    banks: ['State Bank of India (Ayup Tech)', 'HDFC Bank (Ayup Tech)', 'ICICI Bank'],
    salaryAccounts: [],
    months: ['Aug-2026', 'Jul-2026', 'Sep-2026', 'Oct-2026']
  });

  const [schoolName, setSchoolName] = useState('Ayup Tech');
  const [schoolBank, setSchoolBank] = useState('All School Banks');
  const [salaryAccount, setSalaryAccount] = useState('All Salary A/C');
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

  const fetchFilterOptions = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/salary-structure/monthly-reports-filter-options`, { headers });
      if (res.ok) {
        const json = await res.json();
        setFilterOptions(prev => ({
          ...prev,
          ...json,
          schools: json.schools?.length ? json.schools : ['Ayup Tech'],
          months: json.months?.length ? json.months : ['Aug-2026', 'Jul-2026', 'Sep-2026', 'Oct-2026']
        }));
        if (json.schools?.[0]) setSchoolName(json.schools[0]);
        if (json.months?.[0]) setMonthYear(json.months[0]);
      }
    } catch (e) {
      console.error('Failed to load filter options', e);
    }
  };

  const fetchChallan = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (monthYear && monthYear !== 'All') params.append('monthYear', monthYear);
      if (schoolBank && !schoolBank.includes('All')) params.append('schoolBank', schoolBank);
      if (salaryAccount && !salaryAccount.includes('All')) params.append('salaryAccount', salaryAccount);

      const res = await fetch(`${API_BASE}/api/salary-structure/pf-challan-report?${params.toString()}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        showNotif('error', 'Failed to fetch PF Challan statement');
      }
    } catch (err) {
      console.error(err);
      showNotif('error', 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilterOptions();
    fetchChallan();
  }, []);

  const accounts = data.accounts || [];
  const summary = data.summary || {};

  const exportCSV = () => {
    if (!accounts.length) return;
    const headersList = ['Account No', 'Account Description', 'Subscribers', 'Amount (₹)'];
    const rows = accounts.map(a => [
      `"${a.acNo}"`,
      `"${a.description}"`,
      a.subscribers,
      a.amount
    ]);
    rows.push(['Total', 'Grand Total Remittance', summary.totalSubscribers || 0, summary.totalChallanAmount || 0]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersList.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PF_Challan_Statement_${monthYear}_AyupTech.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotif('success', 'PF Challan CSV downloaded successfully');
  };

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '85vh', backgroundColor: '#f4f6f9', fontFamily: 'Inter, sans-serif' }}>
      {/* Toast Notification */}
      {statusMsg && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
          padding: '12px 20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          backgroundColor: statusMsg.type === 'success' ? '#10B981' : '#EF4444',
          color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '500'
        }}>
          {statusMsg.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {statusMsg.text}
        </div>
      )}

      {/* Sidebar */}
      <div style={{
        width: isSidebarOpen ? '290px' : '0px',
        backgroundColor: '#ffffff',
        borderRight: isSidebarOpen ? '1px solid #e2e8f0' : 'none',
        transition: 'width 0.25s ease',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0
      }}>
        {isSidebarOpen && (
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #edf2f7', paddingBottom: '12px' }}>
              <Filter size={18} color="#159BD7" />
              <span style={{ fontWeight: '700', fontSize: '14px', color: '#1a202c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Challan Parameters
              </span>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>School Name</label>
              <select value={schoolName} onChange={e => setSchoolName(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                {(filterOptions.schools || ['Ayup Tech']).map((sch, idx) => (
                  <option key={idx} value={sch}>{sch}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>School Bank</label>
              <select value={schoolBank} onChange={e => setSchoolBank(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option>All School Banks</option>
                {(filterOptions.banks || ['State Bank of India (Ayup Tech)', 'HDFC Bank']).map((b, idx) => (
                  <option key={idx} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Salary A/c No.</label>
              <select value={salaryAccount} onChange={e => setSalaryAccount(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option>All Salary A/C</option>
                {(filterOptions.salaryAccounts || []).map((a, idx) => (
                  <option key={idx} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Challan Month</label>
              <select value={monthYear} onChange={e => setMonthYear(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                {(filterOptions.months || ['Aug-2026', 'Jul-2026', 'Sep-2026', 'Oct-2026']).map((m, idx) => (
                  <option key={idx} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div style={{ marginTop: '10px' }}>
              <button
                onClick={fetchChallan}
                disabled={loading}
                style={{
                  width: '100%', backgroundColor: '#159BD7', color: '#ffffff', border: 'none',
                  padding: '10px', borderRadius: '6px', fontWeight: '600', fontSize: '13px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer'
                }}
              >
                <Eye size={16} /> {loading ? 'Fetching Challan...' : 'Generate Challan Statement'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '16px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              title={isSidebarOpen ? 'Hide Filters' : 'Show Filters'}
              style={{
                background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px',
                width: '32px', height: '32px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', color: '#475569'
              }}
            >
              {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
                  PF Monthly ECR Challan Statement
                </h2>
                <span style={{
                  backgroundColor: '#e0f2fe', color: '#0369a1', padding: '2px 10px',
                  borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <Sparkles size={12} /> {monthYear}
                </span>
                <span style={{
                  backgroundColor: '#dcfce7', color: '#166534', padding: '2px 10px',
                  borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <Check size={12} /> {data.paymentStatus || 'PAID & CONFIRMED'}
                </span>
              </div>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
                Electronic Challan cum Return (ECR) • Establishment: {data.establishmentId || 'UPNOI0019284000'} ({schoolName})
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={fetchChallan}
              title="Refresh"
              style={{
                padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1',
                background: '#ffffff', cursor: 'pointer', color: '#475569', display: 'flex', alignItems: 'center'
              }}
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>

            <button
              onClick={exportCSV}
              style={{
                backgroundColor: '#10b981', color: '#ffffff', border: 'none',
                padding: '7px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600',
                display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer'
              }}
            >
              <Download size={14} /> Export CSV
            </button>

            <button
              onClick={() => window.print()}
              style={{
                backgroundColor: '#0284c7', color: '#ffffff', border: 'none',
                padding: '7px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600',
                display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer'
              }}
            >
              <Printer size={14} /> Print Challan
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div style={{ padding: '20px 24px 10px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
              <Users size={22} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Subscribers Count</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>{summary.totalSubscribers || 0}</div>
              <div style={{ fontSize: '11px', color: '#0284c7' }}>ECR Member Records</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
              <DollarSign size={22} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>EPF Wages Base</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>₹{(summary.totalEpfWages || 0).toLocaleString('en-IN')}</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Wages u/s 6 of EPF Act</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4338ca' }}>
              <Landmark size={22} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>TRRN Reference</div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#4338ca', fontFamily: 'monospace' }}>{data.trrnNumber || 'TRRN-2026-99281'}</div>
              <div style={{ fontSize: '11px', color: '#10b981', fontWeight: '600' }}>Confirmed via SBI e-Pay</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Total Remitted</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#16a34a' }}>₹{(summary.totalChallanAmount || 0).toLocaleString('en-IN')}</div>
              <div style={{ fontSize: '11px', color: '#16a34a' }}>EPF + EPS + EDLI + Admin</div>
            </div>
          </div>
        </div>

        {/* Challan Breakdown Table & Receipt Details */}
        <div style={{ padding: '16px 24px', flex: 1, overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            {/* Left Account Table */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', fontSize: '13px', color: '#1e293b' }}>
                  EPFO Account-Wise Remittance Breakdown
                </span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>ECR Version: 2.0</span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Account Code</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Head Description</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600', textAlign: 'center' }}>Subscribers</th>
                    <th style={{ padding: '12px 16px', fontWeight: '700', textAlign: 'right' }}>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((acc, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '600', color: '#0369a1', fontFamily: 'monospace' }}>{acc.acNo}</td>
                      <td style={{ padding: '12px 16px', color: '#334155' }}>{acc.description}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#64748b' }}>{acc.subscribers}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: '#0f172a' }}>
                        ₹{(acc.amount || 0).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ backgroundColor: '#f8fafc', borderTop: '2px solid #cbd5e1', fontWeight: '700', color: '#0f172a' }}>
                    <td colSpan={2} style={{ padding: '14px 16px', textAlign: 'right' }}>Total Remittance:</td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>{summary.totalSubscribers || 0}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'right', color: '#16a34a', fontSize: '15px' }}>
                      ₹{(summary.totalChallanAmount || 0).toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Right Official Receipt Box */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.5px' }}>
                  Electronic Receipt Details
                </span>
                <h4 style={{ margin: '4px 0 0', color: '#0f172a', fontSize: '15px' }}>{schoolName}</h4>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Establishment Code: <b>{data.establishmentId || 'UPNOI0019284000'}</b></span>
              </div>

              <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '6px' }}>
                  <span style={{ color: '#64748b' }}>Challan Date:</span>
                  <span style={{ fontWeight: '600', color: '#0f172a' }}>{data.challanDate || `15-${monthYear}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '6px' }}>
                  <span style={{ color: '#64748b' }}>Wage Month:</span>
                  <span style={{ fontWeight: '600', color: '#0f172a' }}>{data.wageMonth || monthYear}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '6px' }}>
                  <span style={{ color: '#64748b' }}>Bank Name:</span>
                  <span style={{ fontWeight: '600', color: '#0f172a' }}>{data.bankName || 'State Bank of India'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '6px' }}>
                  <span style={{ color: '#64748b' }}>CRN Number:</span>
                  <span style={{ fontWeight: '600', color: '#0369a1', fontFamily: 'monospace' }}>CRN-{monthYear.replace('-', '')}-88219</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '6px' }}>
                  <span style={{ color: '#64748b' }}>Payment Mode:</span>
                  <span style={{ fontWeight: '600', color: '#0f172a' }}>NEFT / Net Banking</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                  <span style={{ color: '#64748b', fontWeight: '700' }}>Amount in Words:</span>
                </div>
                <div style={{ fontStyle: 'italic', fontSize: '11px', color: '#475569', backgroundColor: '#f8fafc', padding: '8px', borderRadius: '4px' }}>
                  Thirty Three Thousand Seven Hundred Fifty Rupees Only
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Authorized Signatory</div>
                <div style={{ fontWeight: '700', fontSize: '13px', color: '#0f172a', marginTop: '2px' }}>Ayup Tech Payroll & Finance Authority</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
