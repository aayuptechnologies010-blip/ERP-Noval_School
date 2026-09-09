import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, Search, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, Award, FileText, Building2,
  ChevronLeft, ChevronRight, User, Calendar, ShieldCheck
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function ExperienceCertificateReport() {
  const [certData, setCertData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [staffList, setStaffList] = useState([]);
  const [selectedEmpId, setSelectedEmpId] = useState('');
  const [schoolName, setSchoolName] = useState('Ayup Tech');
  const [customConduct, setCustomConduct] = useState('Exemplary, Sincere & Highly Professional');

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotif = (type, text) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const fetchCertificate = async (empId) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (empId) params.append('employeeId', empId);

      const res = await fetch(`${API_BASE}/api/salary-structure/experience-certificate-report?${params.toString()}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setCertData(json);
        if (json.staffList?.length && !staffList.length) {
          setStaffList(json.staffList);
          if (!selectedEmpId) setSelectedEmpId(json.employeeId || json.staffList[0].employeeId);
        }
      } else {
        showNotif('error', 'Failed to fetch Experience Certificate');
      }
    } catch (err) {
      console.error(err);
      showNotif('error', 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificate('');
  }, []);

  const handleSelectStaff = (e) => {
    const empId = e.target.value;
    setSelectedEmpId(empId);
  };

  const handleShow = () => {
    fetchCertificate(selectedEmpId);
  };

  const handlePrint = () => {
    window.print();
  };

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
            <Award size={20} color="#38bdf8" />
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, letterSpacing: '0.3px' }}>Certificate Issue</h3>
          </div>
          <p style={{ margin: '6px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>Ayup Tech Experience Letter</p>
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
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px', display: 'block' }}>Select Employee / Staff</label>
            <select
              value={selectedEmpId}
              onChange={handleSelectStaff}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#f8fafc', color: '#1e293b' }}
            >
              {staffList.map(s => (
                <option key={s.employeeId} value={s.employeeId}>
                  {s.staffName} ({s.employeeId}) - {s.department}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px', display: 'block' }}>Conduct & Character Appraisal</label>
            <select
              value={customConduct}
              onChange={e => setCustomConduct(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#f8fafc', color: '#1e293b' }}
            >
              <option value="Exemplary, Sincere & Highly Professional">Exemplary, Sincere & Highly Professional</option>
              <option value="Outstanding Academic Excellence & Dedication">Outstanding Academic Excellence & Dedication</option>
              <option value="Very Good Conduct and Punctual Service">Very Good Conduct and Punctual Service</option>
              <option value="Satisfactory with Commendable Contribution">Satisfactory with Commendable Contribution</option>
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
              Generate Certificate
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
                HR Verification
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#16a34a', fontWeight: 600, background: '#dcfce7', padding: '2px 8px', borderRadius: '4px' }}>
                <Sparkles size={12} /> Ayup Tech Verified
              </span>
            </div>
            <h1 style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>
              Official Experience & Service Certificate
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
              <Printer size={15} /> Print Certificate
            </button>
          </div>
        </div>

        {/* Certificate Display Area */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
          {certData ? (
            <div style={{
              width: '100%',
              maxWidth: '850px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
              border: '2px solid #0284c7',
              padding: '48px',
              position: 'relative',
              boxSizing: 'border-box'
            }}>
              {/* Corner Accents */}
              <div style={{ position: 'absolute', top: '12px', left: '12px', width: '24px', height: '24px', borderTop: '3px solid #0284c7', borderLeft: '3px solid #0284c7' }} />
              <div style={{ position: 'absolute', top: '12px', right: '12px', width: '24px', height: '24px', borderTop: '3px solid #0284c7', borderRight: '3px solid #0284c7' }} />
              <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '24px', height: '24px', borderBottom: '3px solid #0284c7', borderLeft: '3px solid #0284c7' }} />
              <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '24px', height: '24px', borderBottom: '3px solid #0284c7', borderRight: '3px solid #0284c7' }} />

              {/* Institution Header */}
              <div style={{ textAlign: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '20px', marginBottom: '28px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Building2 size={26} color="#0284c7" />
                  <span style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', letterSpacing: '1px' }}>
                    AYUP TECH
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#475569', fontWeight: 500 }}>
                  Approved by AICTE & Affiliated to State Educational Board • Recognized Centre of Excellence
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>
                  {certData.schoolAddress || 'Ayup Tech Knowledge Campus, Sector 62, Noida - 201309 (UP)'}
                </div>
              </div>

              {/* Ref & Date Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', fontSize: '12px', color: '#475569' }}>
                <div><b>Ref No:</b> <span style={{ fontFamily: 'monospace', color: '#0284c7', fontWeight: 600 }}>{certData.refNo}</span></div>
                <div><b>Issue Date:</b> <span>{certData.issueDate}</span></div>
              </div>

              {/* Certificate Title */}
              <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                <span style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: '#0f172a',
                  borderBottom: '2px solid #0f172a',
                  paddingBottom: '4px'
                }}>
                  Experience Certificate
                </span>
                <div style={{ fontSize: '11px', color: '#64748b', fontStyle: 'italic', marginTop: '6px' }}>
                  TO WHOMSOEVER IT MAY CONCERN
                </div>
              </div>

              {/* Body Text */}
              <div style={{ fontSize: '14px', lineHeight: '1.9', color: '#334155', textAlign: 'justify', marginBottom: '40px' }}>
                <p>
                  This is to certify that <b>Mr./Ms. {certData.staffName}</b> (Employee ID: <b>{certData.employeeId}</b>) has been an esteemed member of <b>Ayup Tech</b>, serving with dedication in the Department of <b>{certData.department}</b> as <b>{certData.designation}</b> from <b>{certData.doj}</b> to the present date.
                </p>
                <p style={{ marginTop: '16px' }}>
                  During their qualifying service tenure of <b>{certData.serviceDurationText}</b>, they have exhibited thorough professionalism, academic commitment, and profound organizational leadership. Their conduct and character throughout their tenure have been evaluated as <b>"{customConduct || certData.conduct}"</b>.
                </p>
                <p style={{ marginTop: '16px' }}>
                  We place on record our appreciation for their sincere contributions toward the institutional growth of Ayup Tech and wish them the very highest success and prosperity in all their future academic and professional endeavors.
                </p>
              </div>

              {/* Key Highlights Table */}
              <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '16px 20px', marginBottom: '48px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', fontSize: '12px' }}>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '11px' }}>Designation</span>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{certData.designation}</span>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '11px' }}>Department</span>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{certData.department}</span>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '11px' }}>Date of Joining</span>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{certData.doj}</span>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '11px' }}>Total Experience</span>
                    <span style={{ fontWeight: 600, color: '#0284c7' }}>{certData.serviceDurationText}</span>
                  </div>
                </div>
              </div>

              {/* Signatory Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '40px', paddingTop: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px dashed #0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto', color: '#0284c7', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', textAlign: 'center' }}>
                    AYUP TECH<br />OFFICIAL SEAL
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Institutional Registrar Seal</span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', fontFamily: "'Brush Script MT', cursive, sans-serif", fontSize: '22px', color: '#0f172a' }}>
                    Ankit Kumar
                  </div>
                  <div style={{ borderTop: '1px solid #94a3b8', width: '220px', margin: '6px 0 4px auto' }} />
                  <div style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a' }}>
                    {certData.signatoryPrincipal}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    Ayup Tech Administration
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: '60px', color: '#94a3b8', textAlign: 'center' }}>
              {loading ? 'Generating Experience Certificate...' : 'No certificate data available.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
