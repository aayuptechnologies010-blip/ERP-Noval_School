import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, Search, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, User, Briefcase, Landmark, ShieldCheck,
  ChevronLeft, ChevronRight, Phone, Mail, MapPin, Award,
  GraduationCap, Building2, FileText, Calendar
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function EmployeeBioDataReport() {
  const [bioData, setBioData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [staffList, setStaffList] = useState([]);
  const [selectedEmpId, setSelectedEmpId] = useState('');
  const [schoolName, setSchoolName] = useState('Ayup Tech');
  const [formatType, setFormatType] = useState('Comprehensive Dossier');

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotif = (type, text) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const fetchBioData = async (empId) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (empId) params.append('employeeId', empId);

      const res = await fetch(`${API_BASE}/api/salary-structure/employee-bio-data-report?${params.toString()}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setBioData(json);
        if (json.staffList?.length && !staffList.length) {
          setStaffList(json.staffList);
          if (!selectedEmpId) setSelectedEmpId(json.personalInfo?.employeeId || json.staffList[0].employeeId);
        }
      } else {
        showNotif('error', 'Failed to fetch Employee Bio-Data');
      }
    } catch (err) {
      console.error(err);
      showNotif('error', 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBioData('');
  }, []);

  const handleSelectStaff = (e) => {
    const empId = e.target.value;
    setSelectedEmpId(empId);
  };

  const handleShow = () => {
    fetchBioData(selectedEmpId);
  };

  const handlePrint = () => {
    window.print();
  };

  const personal = bioData?.personalInfo || {};
  const employment = bioData?.employmentInfo || {};
  const statutory = bioData?.statutoryBanking || {};
  const contact = bioData?.contactAddress || {};

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 60px)', backgroundColor: '#f1f5f9', overflow: 'hidden', fontFamily: "'Outfit', 'Segoe UI', sans-serif" }}>
      {/* Toast Notification */}
      {statusMsg && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 20px',
          borderRadius: '10px',
          background: statusMsg.type === 'success' ? '#059669' : '#dc2626',
          color: '#fff',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
          fontWeight: 500,
          animation: 'slideIn 0.3s ease-out'
        }}>
          {statusMsg.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {statusMsg.text}
        </div>
      )}

      {/* Collapsible Sidebar */}
      <div style={{
        width: isSidebarOpen ? '290px' : '0px',
        minWidth: isSidebarOpen ? '290px' : '0px',
        backgroundColor: '#ffffff',
        borderRight: isSidebarOpen ? '1px solid #e2e8f0' : 'none',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 20,
        boxShadow: isSidebarOpen ? '2px 0 10px rgba(0,0,0,0.03)' : 'none'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <User size={20} color="#38bdf8" />
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, letterSpacing: '0.3px' }}>Bio Data Filter</h3>
          </div>
          <p style={{ margin: '6px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>Ayup Tech 360° Staff Dossier</p>
        </div>

        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', flex: 1 }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px', display: 'block' }}>School / Institution</label>
            <select
              value={schoolName}
              onChange={e => setSchoolName(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#f8fafc', color: '#1e293b', fontWeight: 500 }}
            >
              <option value="Ayup Tech">Ayup Tech</option>
              <option value="Ayup Technologies">Ayup Technologies</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px', display: 'block' }}>Select Staff</label>
            <select
              value={selectedEmpId}
              onChange={handleSelectStaff}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#f8fafc', color: '#1e293b' }}
            >
              {staffList.map(s => (
                <option key={s.employeeId} value={s.employeeId}>
                  {s.staffName} ({s.employeeId})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px', display: 'block' }}>Dossier Format</label>
            <select
              value={formatType}
              onChange={e => setFormatType(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#f8fafc', color: '#1e293b' }}
            >
              <option value="Comprehensive Dossier">Comprehensive 360° Dossier</option>
              <option value="Summary Executive View">Summary Executive View</option>
              <option value="Statutory & Banking Only">Statutory & Banking Only</option>
            </select>
          </div>

          <div style={{ marginTop: '10px' }}>
            <button
              onClick={handleShow}
              disabled={loading}
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '13px',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(2,132,199,0.3)',
                transition: 'all 0.2s'
              }}
            >
              {loading ? <RefreshCw size={16} className="animate-spin" /> : <Eye size={16} />}
              Load Bio-Data
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          title={isSidebarOpen ? "Hide Filter Panel" : "Show Filter Panel"}
          style={{
            position: 'absolute',
            top: '18px',
            left: '12px',
            zIndex: 30,
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#0f172a'
          }}
        >
          {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* Top Header */}
        <div style={{
          padding: '16px 24px 16px 52px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '4px' }}>
                HR 360° Profile
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#16a34a', fontWeight: 600, background: '#dcfce7', padding: '2px 8px', borderRadius: '4px' }}>
                <Sparkles size={12} /> Ayup Tech Dossier
              </span>
            </div>
            <h1 style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>
              Employee Comprehensive Bio-Data Profile
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handlePrint}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(15,23,42,0.2)'
              }}
            >
              <Printer size={15} /> Print Full Bio-Data
            </button>
          </div>
        </div>

        {/* Bio Data Content */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {bioData ? (
            <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Profile Card Header */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}>
                <div style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '32px',
                  fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(2,132,199,0.3)'
                }}>
                  {personal.staffName ? personal.staffName.charAt(0) : 'A'}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#0f172a' }}>
                      {personal.staffName}
                    </h2>
                    <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '12px', backgroundColor: '#dcfce7', color: '#15803d' }}>
                      {employment.status || 'Active & Confirmed'}
                    </span>
                  </div>
                  <div style={{ color: '#0284c7', fontWeight: 600, fontSize: '14px', marginTop: '2px' }}>
                    {employment.designation} • {employment.department}
                  </div>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '12px', color: '#64748b', flexWrap: 'wrap' }}>
                    <span><b>Emp ID:</b> {personal.employeeId}</span>
                    <span><b>DOJ:</b> {employment.doj}</span>
                    <span><b>Tenure:</b> {personal.experienceYears} Years</span>
                    <span><b>Staff Type:</b> {employment.staffType}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Pay Band / CPC Level</span>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{employment.payScale}</span>
                </div>
              </div>

              {/* 4 Multi-column Sections */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                {/* 1. Personal & Educational Profile */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
                    <GraduationCap size={18} color="#0284c7" />
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Personal & Qualifications</h3>
                  </div>
                  <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 0', color: '#64748b', width: '40%' }}>Date of Birth</td>
                        <td style={{ padding: '8px 0', fontWeight: 600, color: '#0f172a' }}>{personal.dob}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 0', color: '#64748b' }}>Gender / Category</td>
                        <td style={{ padding: '8px 0', fontWeight: 600, color: '#0f172a' }}>{personal.gender} / {personal.category}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 0', color: '#64748b' }}>Blood Group</td>
                        <td style={{ padding: '8px 0', fontWeight: 600, color: '#dc2626' }}>{personal.bloodGroup}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 0', color: '#64748b' }}>Qualification</td>
                        <td style={{ padding: '8px 0', fontWeight: 600, color: '#0f172a' }}>{personal.qualification}</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '8px 0', color: '#64748b' }}>Total Experience</td>
                        <td style={{ padding: '8px 0', fontWeight: 600, color: '#0284c7' }}>{personal.experienceYears} Years Academic Tenure</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 2. Employment & Compensation */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
                    <Briefcase size={18} color="#0284c7" />
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Employment & Compensation</h3>
                  </div>
                  <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 0', color: '#64748b', width: '40%' }}>Department</td>
                        <td style={{ padding: '8px 0', fontWeight: 600, color: '#0f172a' }}>{employment.department}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 0', color: '#64748b' }}>Designation</td>
                        <td style={{ padding: '8px 0', fontWeight: 600, color: '#0f172a' }}>{employment.designation}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 0', color: '#64748b' }}>Monthly Basic Pay</td>
                        <td style={{ padding: '8px 0', fontWeight: 600, color: '#0f172a' }}>₹{(employment.basicPay || 0).toLocaleString('en-IN')}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 0', color: '#64748b' }}>Monthly Gross Pay</td>
                        <td style={{ padding: '8px 0', fontWeight: 700, color: '#d97706' }}>₹{(employment.grossSalary || 0).toLocaleString('en-IN')}</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '8px 0', color: '#64748b' }}>Monthly Take-Home</td>
                        <td style={{ padding: '8px 0', fontWeight: 700, color: '#16a34a' }}>₹{(employment.netSalary || 0).toLocaleString('en-IN')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 3. Statutory Compliance & Banking */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
                    <Landmark size={18} color="#0284c7" />
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Statutory & Banking</h3>
                  </div>
                  <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 0', color: '#64748b', width: '40%' }}>PAN Number</td>
                        <td style={{ padding: '8px 0', fontFamily: 'monospace', fontWeight: 600, color: '#0f172a' }}>{statutory.panNumber}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 0', color: '#64748b' }}>Aadhaar Number</td>
                        <td style={{ padding: '8px 0', fontFamily: 'monospace', fontWeight: 600, color: '#0f172a' }}>{statutory.aadharNumber}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 0', color: '#64748b' }}>EPFO UAN</td>
                        <td style={{ padding: '8px 0', fontFamily: 'monospace', fontWeight: 600, color: '#4338ca' }}>{statutory.uanNumber}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 0', color: '#64748b' }}>Disbursement Bank</td>
                        <td style={{ padding: '8px 0', fontWeight: 600, color: '#0f172a' }}>{statutory.bankName}</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '8px 0', color: '#64748b' }}>Bank A/c & IFSC</td>
                        <td style={{ padding: '8px 0', fontFamily: 'monospace', color: '#475569' }}>
                          {statutory.bankAccountNo} • {statutory.ifscCode}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 4. Contact & Residential Profile */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
                    <MapPin size={18} color="#0284c7" />
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Contact & Address</h3>
                  </div>
                  <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 0', color: '#64748b', width: '40%' }}>Official Mobile</td>
                        <td style={{ padding: '8px 0', fontWeight: 600, color: '#0f172a' }}>{contact.mobileNo}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 0', color: '#64748b' }}>Institutional Email</td>
                        <td style={{ padding: '8px 0', fontWeight: 600, color: '#0284c7' }}>{contact.email}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 0', color: '#64748b' }}>Emergency Contact</td>
                        <td style={{ padding: '8px 0', fontWeight: 600, color: '#0f172a' }}>{contact.emergencyContact}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 0', color: '#64748b' }}>Registered Nominee</td>
                        <td style={{ padding: '8px 0', fontWeight: 600, color: '#0f172a' }}>{contact.nominee}</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '8px 0', color: '#64748b' }}>Campus Address</td>
                        <td style={{ padding: '8px 0', color: '#475569', lineHeight: 1.4 }}>
                          {contact.permanentAddress}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: '60px', color: '#94a3b8', textAlign: 'center' }}>
              {loading ? 'Loading Employee Bio-Data dossier...' : 'No bio-data records found.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
