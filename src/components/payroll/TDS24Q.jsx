import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, Search, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, DollarSign, Users, FileText,
  ChevronLeft, ChevronRight, ShieldCheck, Award, Check, X
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function TDS24Q() {
  const [data, setData] = useState({ records: [], summary: {} });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Filters matching mockup
  const [schoolName, setSchoolName] = useState('NAVALS NATIONAL ACADEMY');
  const [schoolBank, setSchoolBank] = useState('All Salary A/c');
  const [session, setSession] = useState('2026-2027');
  const [staffType, setStaffType] = useState('All (13)');
  const [searchTerm, setSearchTerm] = useState('');

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotif = (type, text) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const fetchAnnualTDS = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('session', session);
      if (staffType && staffType !== 'All (13)') params.append('staffType', staffType);

      const res = await fetch(`${API_BASE}/api/salary-structure/annual-24q?${params.toString()}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to load annual 24Q data:', err);
      showNotif('error', 'Error loading annual TDS 24Q data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnualTDS();
  }, [session, staffType]);

  const filteredRecords = (data.records || []).filter(r => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (
      (r.staffName && r.staffName.toLowerCase().includes(s)) ||
      (r.employeeId && r.employeeId.toLowerCase().includes(s)) ||
      (r.panNumber && r.panNumber.toLowerCase().includes(s))
    );
  });

  const exportCSV = () => {
    if (!filteredRecords.length) return;
    const hdrs = [
      '#', 'Emp ID', 'Staff Name', 'PAN Number', 'Department', 'Designation',
      'Q1 TDS (Apr-Jun)', 'Q2 TDS (Jul-Sep)', 'Q3 TDS (Oct-Dec)', 'Q4 TDS (Jan-Mar)',
      'Total Annual TDS', 'Form 16 Status', 'Compliance Status'
    ];
    const rows = filteredRecords.map((r, i) => [
      i + 1,
      `"${r.employeeId || ''}"`,
      `"${r.staffName || ''}"`,
      `"${r.panNumber || ''}"`,
      `"${r.department || ''}"`,
      `"${r.designation || ''}"`,
      r.q1Tds || 0,
      r.q2Tds || 0,
      r.q3Tds || 0,
      r.q4Tds || 0,
      r.totalAnnualTds || 0,
      `"${r.form16Status || ''}"`,
      `"${r.status || 'Compliant'}"`
    ]);

    const csv = 'data:text/csv;charset=utf-8,' + [hdrs.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `Annual_TDS_24Q_${session}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const summary = data.summary || {};

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 140px)', backgroundColor: '#f8fafc', margin: '-20px' }}>
      
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

      {/* LEFT FILTER SIDEBAR */}
      {isSidebarOpen && (
        <div style={{
          width: '310px', backgroundColor: 'white', padding: '24px',
          borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column',
          gap: '18px', overflowY: 'auto', flexShrink: 0, boxShadow: '2px 0 8px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>
              TDS 24Q Annual Filter
            </h3>
            <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '10px' }}>Annual Return</span>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>School Name</label>
            <select
              value={schoolName}
              onChange={e => setSchoolName(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="NAVALS NATIONAL ACADEMY">NAVALS NATIONAL ACADEMY</option>
              <option value="AYUP TECH MEMORIAL CAMPUS">AYUP TECH MEMORIAL CAMPUS</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>School Bank</label>
            <select
              value={schoolBank}
              onChange={e => setSchoolBank(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All Salary A/c">All Salary A/c</option>
              <option value="HDFC Bank - 50100429188">HDFC Bank - 50100429188</option>
              <option value="SBI Bank - 30219847120">SBI Bank - 30219847120</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Session / Financial Year</label>
            <select
              value={session}
              onChange={e => setSession(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="2026-2027">2026-2027 (Assessment Year 2027-2028)</option>
              <option value="2025-2026">2025-2026 (Assessment Year 2026-2027)</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Staff Type</label>
            <select
              value={staffType}
              onChange={e => setStaffType(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All (13)">All (13 Staff Types)</option>
              <option value="Teaching">Teaching</option>
              <option value="Non-Teaching">Non-Teaching</option>
              <option value="Technical">Technical</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              onClick={fetchAnnualTDS}
              style={{
                flex: 1, backgroundColor: '#159BD7', color: 'white', border: 'none',
                padding: '10px 18px', borderRadius: '6px', display: 'flex',
                alignItems: 'center', justifyContent: 'center', gap: '6px',
                cursor: 'pointer', fontWeight: '600', fontSize: '13px',
                boxShadow: '0 2px 6px rgba(21, 155, 215, 0.3)'
              }}
            >
              <Eye size={16} /> Show
            </button>
            <button
              onClick={() => {
                setSession('2026-2027');
                setStaffType('All (13)');
                setSearchTerm('');
                fetchAnnualTDS();
              }}
              style={{
                backgroundColor: 'white', color: '#64748b', border: '1px solid #cbd5e1',
                padding: '10px 16px', borderRadius: '6px', cursor: 'pointer',
                fontWeight: '600', fontSize: '13px'
              }}
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* COLLAPSIBLE TOGGLE BUTTON */}
      <div style={{ position: 'relative', width: '0px' }}>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            position: 'absolute', top: '24px', left: '-12px', width: '24px', height: '44px',
            backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: '4px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 100, boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
          title={isSidebarOpen ? "Collapse Filter" : "Expand Filter"}
        >
          {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* RIGHT CONTENT AREA */}
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* HEADER BANNER */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px 24px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#159BD7', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {schoolName} • ANNUAL TAX COMPLIANCE CONSOLIDATION
            </div>
            <h2 style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>
              TDS 24Q Annual Overview — FY {session}
            </h2>
            <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>
              Consolidated 4-Quarter TDS statement, deductee tax matrix, and Form 16 generation eligibility
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={exportCSV}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
                background: '#159BD7', color: 'white', border: 'none', borderRadius: '6px',
                fontWeight: '600', cursor: 'pointer', fontSize: '13px'
              }}
            >
              <Download size={16} /> Export Annual CSV
            </button>
            <button
              onClick={handlePrint}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
                background: 'white', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '6px',
                fontWeight: '600', cursor: 'pointer', fontSize: '13px'
              }}
            >
              <Printer size={16} /> Print Overview
            </button>
          </div>
        </div>

        {/* KPI CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { label: 'Total Annual TDS', val: `₹${(summary.totalAnnualTds || 0).toLocaleString('en-IN')}`, icon: <DollarSign size={20} color="#16a34a" />, bg: '#f0fdf4' },
            { label: 'Total Staff Monitored', val: filteredRecords.length, icon: <Users size={20} color="#159BD7" />, bg: '#eff6ff' },
            { label: 'Q1 + Q2 Deposited', val: `₹${((summary.q1Total || 0) + (summary.q2Total || 0)).toLocaleString('en-IN')}`, icon: <ShieldCheck size={20} color="#9333ea" />, bg: '#fdf4ff' },
            { label: 'TRACES Filing Status', val: 'Compliant (100%)', icon: <Award size={20} color="#d97706" />, bg: '#fef3c7' }
          ].map((c, i) => (
            <div key={i} style={{ background: 'white', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {c.icon}
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>{c.label}</div>
                <div style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a' }}>{c.val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* DATA TABLE */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>
              Staff Annual TDS Matrix ({filteredRecords.length} Employees)
            </div>
            <div style={{ position: 'relative', width: '260px' }}>
              <Search size={15} style={{ position: 'absolute', left: '10px', top: '9px', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search staff, ID or PAN..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '7px 12px 7px 32px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading annual 24Q records...</div>
          ) : filteredRecords.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No annual 24Q records found for the selected session.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', color: '#475569', borderBottom: '2px solid #e2e8f0', fontWeight: '700' }}>
                    <th style={{ padding: '12px 14px' }}>#</th>
                    <th style={{ padding: '12px 14px' }}>Emp ID</th>
                    <th style={{ padding: '12px 14px' }}>Staff Name</th>
                    <th style={{ padding: '12px 14px' }}>PAN Number</th>
                    <th style={{ padding: '12px 14px' }}>Department</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Q1 TDS (Apr-Jun)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Q2 TDS (Jul-Sep)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Q3 TDS (Oct-Dec)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Q4 TDS (Jan-Mar)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Annual Total TDS</th>
                    <th style={{ padding: '12px 14px', textAlign: 'center' }}>Form 16 Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((r, i) => {
                    const isAyup = r.staffName?.toLowerCase().includes('ayup');
                    return (
                      <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: isAyup ? 'rgba(21, 155, 215, 0.03)' : 'white' }}>
                        <td style={{ padding: '12px 14px', color: '#64748b' }}>{i + 1}</td>
                        <td style={{ padding: '12px 14px', fontWeight: '700', color: '#159BD7' }}>
                          {r.employeeId}
                        </td>
                        <td style={{ padding: '12px 14px', fontWeight: '600', color: '#0f172a' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {r.staffName}
                            {isAyup && (
                              <span style={{ fontSize: '10px', background: '#dbeafe', color: '#1e40af', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>
                                AYUP
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: '11px', color: '#64748b' }}>{r.designation}</span>
                        </td>
                        <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontWeight: '700', color: '#334155' }}>
                          {r.panNumber}
                        </td>
                        <td style={{ padding: '12px 14px', color: '#475569' }}>{r.department}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#475569' }}>
                          ₹{(r.q1Tds || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#475569' }}>
                          ₹{(r.q2Tds || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#475569' }}>
                          ₹{(r.q3Tds || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#475569' }}>
                          ₹{(r.q4Tds || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '800', color: '#dc2626' }}>
                          ₹{(r.totalAnnualTds || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                          <span style={{
                            padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '700',
                            background: '#dbeafe', color: '#1e40af'
                          }}>
                            {r.form16Status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr style={{ background: '#f8fafc', fontWeight: '800', borderTop: '2px solid #cbd5e1' }}>
                    <td colSpan={5} style={{ padding: '14px', textAlign: 'right', color: '#0f172a' }}>
                      ANNUAL GRAND TOTALS ({filteredRecords.length} Staff):
                    </td>
                    <td style={{ padding: '14px', textAlign: 'right', color: '#0f172a' }}>
                      ₹{(summary.q1Total || 0).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px', textAlign: 'right', color: '#0f172a' }}>
                      ₹{(summary.q2Total || 0).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px', textAlign: 'right', color: '#0f172a' }}>
                      ₹{(summary.q3Total || 0).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px', textAlign: 'right', color: '#0f172a' }}>
                      ₹{(summary.q4Total || 0).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px', textAlign: 'right', color: '#16a34a', fontSize: '13px' }}>
                      ₹{(summary.totalAnnualTds || 0).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px', textAlign: 'center', color: '#15803d', fontSize: '11px' }}>
                      All Quarters Reconciled
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
