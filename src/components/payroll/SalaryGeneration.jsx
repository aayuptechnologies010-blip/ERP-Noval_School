import React, { useState, useEffect } from 'react';
import { Eye, XCircle, Play, Download, RefreshCw, Lock, CheckCircle, AlertCircle, Sparkles, DollarSign, Users, ShieldCheck, FileText, X } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function SalaryGeneration() {
  const [payrolls, setPayrolls] = useState([]);
  const [salaryAccounts, setSalaryAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Filters
  const [salaryType, setSalaryType] = useState('Regular');
  const [selectedAccount, setSelectedAccount] = useState('All Salary A/c');
  const [selectedMonthYear, setSelectedMonthYear] = useState('Aug-2026');
  const [selectedStaffType, setSelectedStaffType] = useState('All Employee Types');
  const [searchTerm, setSearchTerm] = useState('');

  // Selected slip modal
  const [selectedSlip, setSelectedSlip] = useState(null);

  // Notifications
  const [statusMessage, setStatusMessage] = useState(null);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotification = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const fetchPayrolls = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedMonthYear) params.append('monthYear', selectedMonthYear);
      if (salaryType) params.append('salaryType', salaryType);
      if (selectedStaffType && selectedStaffType !== 'All Employee Types') params.append('staffType', selectedStaffType);
      if (selectedAccount && selectedAccount !== 'All Salary A/c') params.append('salaryAccount', selectedAccount);

      const res = await fetch(`${API_BASE}/api/salary-structure/salary-generation?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setPayrolls(Array.isArray(data) ? data : []);
      }

      // Fetch accounts
      const aRes = await fetch(`${API_BASE}/api/salary-accounts`, { headers });
      if (aRes.ok) {
        const aData = await aRes.json();
        setSalaryAccounts(Array.isArray(aData) ? aData : []);
      }
    } catch (err) {
      console.error('Error fetching payrolls:', err);
      showNotification('error', 'Server error loading payroll records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  // Run Monthly Salary Generation
  const handleGenerateSalary = async () => {
    try {
      setGenerating(true);
      const res = await fetch(`${API_BASE}/api/salary-structure/salary-generation`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          monthYear: selectedMonthYear,
          salaryAccount: selectedAccount,
          staffType: selectedStaffType,
          salaryType
        })
      });

      if (res.ok) {
        const result = await res.json();
        showNotification('success', result.message || 'Salaries generated successfully!');
        fetchPayrolls();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Generation failed');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Server error during salary generation');
    } finally {
      setGenerating(false);
    }
  };

  // Toggle freeze status
  const handleToggleFreeze = async (payroll) => {
    const newStatus = payroll.status === 'Frozen' ? 'Generated' : 'Frozen';
    try {
      const res = await fetch(`${API_BASE}/api/salary-structure/salary-generation/${payroll._id}/status`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        showNotification('success', `Payroll for ${payroll.staffName} marked as ${newStatus}`);
        fetchPayrolls();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Export CSV
  const exportCSV = () => {
    if (filteredPayrolls.length === 0) return;
    const headersLine = ['Staff Name', 'Employee ID', 'Department', 'Designation', 'Basic (₹)', 'DA (₹)', 'HRA (₹)', 'Gross Salary (₹)', 'PF (₹)', 'TDS (₹)', 'Advance Rec (₹)', 'Total Deductions (₹)', 'Net Salary (₹)', 'Status'];
    const rows = filteredPayrolls.map(p => [
      `"${p.staffName || ''}"`,
      `"${p.employeeId || ''}"`,
      `"${p.department || ''}"`,
      `"${p.designation || ''}"`,
      p.basicSalary,
      p.da,
      p.hra,
      p.grossSalary,
      p.pfDeduction,
      p.tdsDeduction,
      p.advanceDeduction,
      p.totalDeductions,
      p.netSalary,
      `"${p.status || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersLine.join(','), ...rows.map(row => row.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `Salary_Payroll_Register_${selectedMonthYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('success', 'Payroll register exported to CSV!');
  };

  const filteredPayrolls = payrolls.filter(p => {
    return (
      (p.staffName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.employeeId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.department || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // KPI Calculations
  const totalGross = filteredPayrolls.reduce((s, p) => s + (p.grossSalary || 0), 0);
  const totalDeductions = filteredPayrolls.reduce((s, p) => s + (p.totalDeductions || 0), 0);
  const totalNet = filteredPayrolls.reduce((s, p) => s + (p.netSalary || 0), 0);

  return (
    <div className="global-settings-container" style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '85vh' }}>
      
      {/* Toast Notification */}
      {statusMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          padding: '12px 20px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          backgroundColor: statusMessage.type === 'success' ? '#10b981' : '#ef4444',
          color: 'white',
          fontWeight: '500'
        }}>
          {statusMessage.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DollarSign size={24} color="#159BD7" /> Salary Generation & Payroll Engine
          </h2>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>
            Execute monthly salary calculations, statutory deductions (PF/ESI/TDS/Advance), and finalize disbursements
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleGenerateSalary}
            disabled={generating}
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              padding: '9px 20px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: '700',
              cursor: generating ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 4px rgba(16, 185, 129, 0.25)'
            }}
          >
            <Play size={16} /> {generating ? 'Computing Payroll...' : `Run Salary Generation (${selectedMonthYear})`}
          </button>
          <button
            onClick={exportCSV}
            style={{
              backgroundColor: '#fff',
              color: '#475569',
              border: '1px solid #cbd5e1',
              padding: '9px 16px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            <Download size={16} /> Export Register
          </button>
          <button
            onClick={fetchPayrolls}
            style={{
              backgroundColor: '#fff',
              color: '#475569',
              border: '1px solid #cbd5e1',
              padding: '9px 12px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
            title="Refresh"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Top Filter Card */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
        
        {/* Radio Category */}
        <div style={{ display: 'flex', gap: '30px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', fontWeight: '600', color: '#334155', cursor: 'pointer' }}>
            <input
              type="radio"
              name="salaryType"
              checked={salaryType === 'Regular'}
              onChange={() => setSalaryType('Regular')}
            /> For Regular Staff
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', fontWeight: '600', color: '#334155', cursor: 'pointer' }}>
            <input
              type="radio"
              name="salaryType"
              checked={salaryType === 'Hourly'}
              onChange={() => setSalaryType('Hourly')}
            /> For Hourly / Guest Faculty
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) auto', gap: '16px', alignItems: 'flex-end' }}>
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Salary Account</label>
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}
            >
              <option value="All Salary A/c">All Salary A/c</option>
              <option value="Ayup Salary Account">Ayup Salary Account</option>
              {salaryAccounts.map(a => (
                <option key={a._id} value={a.accountName}>{a.accountName}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Salary Month-Year</label>
            <select
              value={selectedMonthYear}
              onChange={(e) => setSelectedMonthYear(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff', fontWeight: '600' }}
            >
              <option value="Aug-2026">Aug-2026</option>
              <option value="Sep-2026">Sep-2026</option>
              <option value="Oct-2026">Oct-2026</option>
              <option value="Nov-2026">Nov-2026</option>
              <option value="Dec-2026">Dec-2026</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Employee Type</label>
            <select
              value={selectedStaffType}
              onChange={(e) => setSelectedStaffType(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}
            >
              <option value="All Employee Types">All Employee Types</option>
              <option value="Teaching">Teaching Staff</option>
              <option value="Non-Teaching">Non-Teaching Staff</option>
              <option value="Administrative">Administrative</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Search</label>
            <input
              type="text"
              placeholder="Search staff, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={fetchPayrolls}
              style={{
                backgroundColor: '#159BD7',
                color: 'white',
                border: 'none',
                padding: '9px 20px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              <Eye size={16} /> View
            </button>
            <button
              onClick={() => {
                setSelectedAccount('All Salary A/c');
                setSelectedMonthYear('Aug-2026');
                setSelectedStaffType('All Employee Types');
                setSearchTerm('');
              }}
              style={{
                backgroundColor: '#ffbd59',
                color: 'white',
                border: 'none',
                padding: '9px 16px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              <XCircle size={16} /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Financial Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Processed Employees</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginTop: '4px' }}>{filteredPayrolls.length} Staff</div>
        </div>
        <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #bae6fd' }}>
          <div style={{ fontSize: '12px', color: '#0369a1', fontWeight: '600', textTransform: 'uppercase' }}>Gross Payroll (₹)</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#0284c7', marginTop: '4px' }}>
            ₹{totalGross.toLocaleString('en-IN')}
          </div>
        </div>
        <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #fed7aa' }}>
          <div style={{ fontSize: '12px', color: '#9a3412', fontWeight: '600', textTransform: 'uppercase' }}>Total Deductions (₹)</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#ea580c', marginTop: '4px' }}>
            -₹{totalDeductions.toLocaleString('en-IN')}
          </div>
        </div>
        <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
          <div style={{ fontSize: '12px', color: '#166534', fontWeight: '600', textTransform: 'uppercase' }}>Net Payable Payroll (₹)</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#16a34a', marginTop: '4px' }}>
            ₹{totalNet.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #cbd5e1', color: '#334155', fontWeight: '600' }}>
                <th style={{ padding: '12px 14px' }}>#</th>
                <th style={{ padding: '12px 14px' }}>Staff Name</th>
                <th style={{ padding: '12px 14px' }}>Basic (₹)</th>
                <th style={{ padding: '12px 14px' }}>DA (₹)</th>
                <th style={{ padding: '12px 14px' }}>HRA (₹)</th>
                <th style={{ padding: '12px 14px' }}>Gross Salary</th>
                <th style={{ padding: '12px 14px' }}>Deductions</th>
                <th style={{ padding: '12px 14px' }}>Net Payable</th>
                <th style={{ padding: '12px 14px' }}>Payment Mode</th>
                <th style={{ padding: '12px 14px' }}>Status</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="11" style={{ textAlign: 'center', padding: '36px', color: '#64748b' }}>
                    <RefreshCw size={18} className="animate-spin" style={{ display: 'inline', marginRight: '6px' }} /> Loading payroll records...
                  </td>
                </tr>
              ) : filteredPayrolls.length === 0 ? (
                <tr>
                  <td colSpan="11" style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                    No generated salary records found for {selectedMonthYear}. Click "Run Salary Generation" to compute payroll.
                  </td>
                </tr>
              ) : (
                filteredPayrolls.map((p, idx) => {
                  const isAyup = (p.staffName || '').toLowerCase().includes('ayup');
                  return (
                    <tr
                      key={p._id}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        backgroundColor: isAyup ? 'rgba(21, 155, 215, 0.04)' : 'transparent'
                      }}
                    >
                      <td style={{ padding: '10px 14px', color: '#64748b' }}>{idx + 1}</td>
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ fontWeight: '600', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {p.staffName}
                          {isAyup && (
                            <span style={{ backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '10.5px', padding: '1px 5px', borderRadius: '4px', fontWeight: '700', border: '1px solid #7dd3fc' }}>
                              ★ Ayup Tech
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{p.employeeId} | {p.designation}</div>
                      </td>
                      <td style={{ padding: '10px 14px' }}>₹{(p.basicSalary || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '10px 14px' }}>₹{(p.da || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '10px 14px' }}>₹{(p.hra || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '10px 14px', fontWeight: '700', color: '#0284c7' }}>
                        ₹{(p.grossSalary || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '10px 14px', color: '#ea580c', fontWeight: '600' }}>
                        -₹{(p.totalDeductions || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '10px 14px', fontWeight: '800', color: '#16a34a', fontSize: '13.5px' }}>
                        ₹{(p.netSalary || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '10px 14px', color: '#475569' }}>
                        {p.paymentMode}
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '10px',
                          fontSize: '11px',
                          fontWeight: '700',
                          backgroundColor: p.status === 'Frozen' ? '#fee2e2' : '#dcfce7',
                          color: p.status === 'Frozen' ? '#b91c1c' : '#15803d'
                        }}>
                          {p.status}
                        </span>
                      </td>
                      <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                          <button
                            onClick={() => setSelectedSlip(p)}
                            style={{ background: 'none', border: 'none', color: '#159BD7', cursor: 'pointer', padding: '2px' }}
                            title="View Payslip"
                          >
                            <FileText size={16} />
                          </button>
                          <button
                            onClick={() => handleToggleFreeze(p)}
                            style={{ background: 'none', border: 'none', color: p.status === 'Frozen' ? '#10b981' : '#f59e0b', cursor: 'pointer', padding: '2px' }}
                            title={p.status === 'Frozen' ? 'Unlock Payroll' : 'Freeze Payroll'}
                          >
                            <Lock size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: '#f8fafc', borderTop: '2px solid #cbd5e1', fontWeight: '700' }}>
                <td colSpan="5" style={{ padding: '12px 14px', textAlign: 'right' }}>Total Payroll:</td>
                <td style={{ padding: '12px 14px', color: '#0284c7' }}>₹{totalGross.toLocaleString('en-IN')}</td>
                <td style={{ padding: '12px 14px', color: '#ea580c' }}>-₹{totalDeductions.toLocaleString('en-IN')}</td>
                <td style={{ padding: '12px 14px', color: '#16a34a', fontSize: '14px' }}>₹{totalNet.toLocaleString('en-IN')}</td>
                <td colSpan="3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Payslip View Modal */}
      {selectedSlip && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '600px',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '16px 20px', backgroundColor: '#159BD7', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Salary Slip - {selectedSlip.monthYear}</h3>
              <button onClick={() => setSelectedSlip(null)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ textAlign: 'center', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#0f172a' }}>{selectedSlip.staffName}</h4>
                <div style={{ fontSize: '12.5px', color: '#64748b' }}>{selectedSlip.designation} | {selectedSlip.department} | Emp ID: {selectedSlip.employeeId}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '13px' }}>
                {/* Earnings */}
                <div>
                  <div style={{ fontWeight: '700', color: '#16a34a', borderBottom: '2px solid #bbf7d0', paddingBottom: '4px', marginBottom: '8px' }}>EARNINGS</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span>Basic Salary:</span> <strong>₹{selectedSlip.basicSalary}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span>Dearness Allowance (DA):</span> <strong>₹{selectedSlip.da}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span>HRA:</span> <strong>₹{selectedSlip.hra}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span>Conveyance Allowance:</span> <strong>₹{selectedSlip.conveyance}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span>Special Allowance:</span> <strong>₹{selectedSlip.specialAllowance}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: '1px solid #e2e8f0', marginTop: '6px', fontWeight: '700' }}>
                    <span>Gross Earnings:</span> <span style={{ color: '#0284c7' }}>₹{selectedSlip.grossSalary}</span>
                  </div>
                </div>

                {/* Deductions */}
                <div>
                  <div style={{ fontWeight: '700', color: '#ea580c', borderBottom: '2px solid #fed7aa', paddingBottom: '4px', marginBottom: '8px' }}>DEDUCTIONS</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span>Provident Fund (PF):</span> <strong>₹{selectedSlip.pfDeduction}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span>Income Tax (TDS):</span> <strong>₹{selectedSlip.tdsDeduction}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span>Advance Loan Recovery:</span> <strong>₹{selectedSlip.advanceDeduction}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span>Insurance Premium:</span> <strong>₹{selectedSlip.insuranceDeduction}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span>LWP / Unpaid Days:</span> <strong>₹{selectedSlip.lwpDeduction}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: '1px solid #e2e8f0', marginTop: '6px', fontWeight: '700' }}>
                    <span>Total Deductions:</span> <span style={{ color: '#ea580c' }}>₹{selectedSlip.totalDeductions}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '20px', padding: '14px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '15px', fontWeight: '700', color: '#166534' }}>Net Take-Home Salary:</span>
                <span style={{ fontSize: '22px', fontWeight: '800', color: '#15803d' }}>₹{selectedSlip.netSalary.toLocaleString('en-IN')}</span>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  onClick={() => window.print()}
                  style={{ backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
                >
                  Print Payslip
                </button>
                <button
                  onClick={() => setSelectedSlip(null)}
                  style={{ backgroundColor: '#e2e8f0', color: '#334155', border: 'none', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
