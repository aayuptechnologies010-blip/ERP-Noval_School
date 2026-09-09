import React, { useState, useEffect } from 'react';
import { Printer, FileText, Download, CheckCircle, AlertCircle, RefreshCw, User, Building, Briefcase, Calendar, Sparkles, Send, Edit3 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function HREntryForms() {
  const [activeFormType, setActiveFormType] = useState('offer'); // 'offer' or 'appointment'
  const [staffList, setStaffList] = useState([]);
  const [applications, setApplications] = useState([]);
  const [staffTypes, setStaffTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters / Selections
  const [selectedSchool, setSelectedSchool] = useState('Noval International School');
  const [selectedStaffType, setSelectedStaffType] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedPersonId, setSelectedPersonId] = useState('');

  // Editable Letter Content Details
  const [letterDetails, setLetterDetails] = useState({
    refNo: 'HR/2026/OFF-0192',
    issueDate: new Date().toISOString().split('T')[0],
    recipientName: 'Ayup Tech',
    designation: 'Senior Fullstack Lead',
    department: 'Information Technology',
    joiningDate: '2026-10-01',
    annualCtc: '₹14,50,000',
    probationPeriod: '6 Months',
    noticePeriod: '30 Days',
    reportingManager: 'Head of Technology',
    schoolName: 'Noval International School',
    schoolAddress: 'Institutional Area, Knowledge Park, New Delhi - 110001',
    terms: [
      'Your employment is subject to verification of credentials and background references.',
      'You will be on probation for a period of 6 months from the date of joining.',
      'During probation, either party may terminate service with 15 days notice.',
      'Working hours will be Monday to Saturday from 8:30 AM to 4:30 PM.',
      'All school policies, intellectual property rights, and confidentiality agreements apply.'
    ]
  });

  const [isEditingTerms, setIsEditingTerms] = useState(false);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  // Fetch Master Data: Staff, Applications, Staff Types
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch applications (Recruitment candidates)
        const appRes = await fetch(`${API_BASE}/api/recruitment/applications`, { headers });
        let appsData = [];
        if (appRes.ok) {
          appsData = await appRes.json();
          setApplications(Array.isArray(appsData) ? appsData : []);
        }

        // Fetch Staff
        const staffRes = await fetch(`${API_BASE}/api/staffs`, { headers });
        let staffData = [];
        if (staffRes.ok) {
          staffData = await staffRes.json();
          setStaffList(Array.isArray(staffData) ? staffData : []);
        }

        // Fetch Staff Types
        const typeRes = await fetch(`${API_BASE}/api/staff-types`, { headers });
        if (typeRes.ok) {
          const types = await typeRes.json();
          setStaffTypes(Array.isArray(types) ? types : []);
        }

        // Pre-select Ayup Tech candidate or staff if present
        const ayupCandidate = appsData.find(a => (a.candidateName || '').toLowerCase().includes('ayup'));
        if (ayupCandidate) {
          setSelectedPersonId(`cand_${ayupCandidate._id}`);
          applyPersonData(`cand_${ayupCandidate._id}`, appsData, staffData);
        } else if (appsData.length > 0) {
          setSelectedPersonId(`cand_${appsData[0]._id}`);
          applyPersonData(`cand_${appsData[0]._id}`, appsData, staffData);
        }
      } catch (err) {
        console.error('Error loading HR entry form data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // When person changes in dropdown
  const handlePersonChange = (personKey) => {
    setSelectedPersonId(personKey);
    applyPersonData(personKey, applications, staffList);
  };

  const applyPersonData = (personKey, apps, staffs) => {
    if (!personKey) return;
    if (personKey.startsWith('cand_')) {
      const id = personKey.replace('cand_', '');
      const cand = apps.find(a => a._id === id);
      if (cand) {
        setLetterDetails(prev => ({
          ...prev,
          recipientName: cand.candidateName || 'Candidate Name',
          designation: cand.jobTitle || 'Lecturer / Staff',
          annualCtc: cand.offeredSalary || cand.expectedCtc || '₹9,50,000',
          refNo: `HR/REC/2026/${cand._id ? cand._id.slice(-4).toUpperCase() : '0101'}`
        }));
      }
    } else if (personKey.startsWith('staff_')) {
      const id = personKey.replace('staff_', '');
      const staff = staffs.find(s => s._id === id);
      if (staff) {
        const fullName = `${staff.basicInfo?.firstName || ''} ${staff.basicInfo?.lastName || ''}`.trim() || staff.name || 'Staff Member';
        setLetterDetails(prev => ({
          ...prev,
          recipientName: fullName,
          designation: staff.jobTitle || staff.designation || 'Faculty Member',
          department: staff.department || 'Academic',
          refNo: `HR/APPT/2026/${staff.employeeId || (staff._id ? staff._id.slice(-4).toUpperCase() : '001')}`
        }));
      }
    }
  };

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // Compute departments from available data
  const allDepartments = Array.from(new Set([
    'Information Technology',
    'Mathematics',
    'Science & Physics',
    'Human Resources',
    'Administration',
    ...applications.map(a => a.department).filter(Boolean),
    ...staffList.map(s => s.department).filter(Boolean)
  ]));

  return (
    <div className="global-settings-container hr-forms-root" style={{ display: 'flex', minHeight: '820px', padding: 0, backgroundColor: '#f1f5f9' }}>
      
      {/* Printable styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .hr-printable-sheet, .hr-printable-sheet * {
            visibility: visible;
          }
          .hr-printable-sheet {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            margin: 0 !important;
            padding: 20mm !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Left Sidebar (Configuration & Selection) */}
      <div className="no-print" style={{ width: '320px', minWidth: '320px', padding: '24px 20px', backgroundColor: '#ffffff', borderRight: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileText size={18} color="#159BD7" /> HR Entry Forms
          </h3>
          <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
            Generate & print formal Offer and Appointment letters
          </p>
        </div>

        <div style={{ height: '1px', backgroundColor: '#e2e8f0' }} />

        {/* Filter / Selector Controls */}
        <div className="form-group">
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px', display: 'block' }}>
            School / Campus
          </label>
          <select
            className="settings-input"
            value={selectedSchool}
            onChange={(e) => {
              setSelectedSchool(e.target.value);
              setLetterDetails(prev => ({ ...prev, schoolName: e.target.value }));
            }}
            style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          >
            <option value="Noval International School">Noval International School</option>
            <option value="Ayup Tech Academy of Excellence">Ayup Tech Academy of Excellence</option>
            <option value="Noval Public Senior Secondary">Noval Public Senior Secondary</option>
          </select>
        </div>

        <div className="form-group">
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px', display: 'block' }}>
            Staff Category
          </label>
          <select
            className="settings-input"
            value={selectedStaffType}
            onChange={(e) => setSelectedStaffType(e.target.value)}
            style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          >
            <option value="All">All Categories</option>
            <option value="Teaching">Teaching Staff</option>
            <option value="Non-Teaching">Non-Teaching Staff</option>
            <option value="Administrative">Administrative</option>
            {staffTypes.map(t => (
              <option key={t._id} value={t.name}>{t.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px', display: 'block' }}>
            Department
          </label>
          <select
            className="settings-input"
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              if (e.target.value !== 'All') {
                setLetterDetails(prev => ({ ...prev, department: e.target.value }));
              }
            }}
            style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          >
            <option value="All">All Departments</option>
            {allDepartments.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px', display: 'block' }}>
            Candidate / Employee <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <select
            className="settings-input"
            value={selectedPersonId}
            onChange={(e) => handlePersonChange(e.target.value)}
            style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: '500' }}
          >
            <option value="">-- Select Candidate or Staff --</option>
            <optgroup label="Recruitment Applicants">
              {applications.map(app => (
                <option key={app._id} value={`cand_${app._id}`}>
                  {app.candidateName} - {app.jobTitle} ({app.status})
                </option>
              ))}
            </optgroup>
            <optgroup label="Current Staff Roster">
              {staffList.map(st => {
                const name = `${st.basicInfo?.firstName || ''} ${st.basicInfo?.lastName || ''}`.trim() || st.name || 'Staff';
                return (
                  <option key={st._id} value={`staff_${st._id}`}>
                    {name} ({st.employeeId || 'ID N/A'})
                  </option>
                );
              })}
            </optgroup>
          </select>
        </div>

        {/* Template Selector Buttons */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
          <button
            onClick={() => setActiveFormType('offer')}
            style={{
              flex: 1,
              backgroundColor: activeFormType === 'offer' ? '#159BD7' : '#f1f5f9',
              color: activeFormType === 'offer' ? '#ffffff' : '#475569',
              border: `1px solid ${activeFormType === 'offer' ? '#159BD7' : '#cbd5e1'}`,
              padding: '9px 12px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '12.5px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Offer Letter
          </button>
          <button
            onClick={() => setActiveFormType('appointment')}
            style={{
              flex: 1.2,
              backgroundColor: activeFormType === 'appointment' ? '#159BD7' : '#f1f5f9',
              color: activeFormType === 'appointment' ? '#ffffff' : '#475569',
              border: `1px solid ${activeFormType === 'appointment' ? '#159BD7' : '#cbd5e1'}`,
              padding: '9px 12px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '12.5px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Appointment Letter
          </button>
        </div>

        {/* Quick Parameters Editor */}
        <div style={{ marginTop: 'auto', backgroundColor: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Edit3 size={14} color="#159BD7" /> Customize Letter Fields
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#64748b' }}>Designation</label>
              <input
                type="text"
                value={letterDetails.designation}
                onChange={(e) => setLetterDetails({ ...letterDetails, designation: e.target.value })}
                style={{ width: '100%', padding: '4px 8px', fontSize: '12px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#64748b' }}>Offered CTC</label>
              <input
                type="text"
                value={letterDetails.annualCtc}
                onChange={(e) => setLetterDetails({ ...letterDetails, annualCtc: e.target.value })}
                style={{ width: '100%', padding: '4px 8px', fontSize: '12px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#64748b' }}>Joining Date</label>
              <input
                type="date"
                value={letterDetails.joiningDate}
                onChange={(e) => setLetterDetails({ ...letterDetails, joiningDate: e.target.value })}
                style={{ width: '100%', padding: '4px 8px', fontSize: '12px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>
          </div>
        </div>

        {/* Print Action Button */}
        <button
          onClick={handlePrint}
          style={{
            backgroundColor: '#0f172a',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontWeight: '600',
            fontSize: '13.5px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <Printer size={16} /> Print / Save PDF
        </button>

      </div>

      {/* Main Content Area (A4 Letter Preview Document) */}
      <div style={{ flexGrow: 1, padding: '30px', overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
        
        <div
          className="hr-printable-sheet"
          style={{
            width: '210mm',
            minHeight: '297mm',
            backgroundColor: '#ffffff',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            padding: '40px 50px',
            borderRadius: '4px',
            boxSizing: 'border-box',
            fontFamily: '"Times New Roman", Times, serif',
            color: '#1a1a1a',
            position: 'relative'
          }}
        >
          
          {/* Header & Logo */}
          <div style={{ textAlign: 'center', borderBottom: '2px solid #159BD7', paddingBottom: '16px', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#159BD7', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>
              {letterDetails.schoolName.toUpperCase()}
            </h1>
            <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#555' }}>
              {letterDetails.schoolAddress} | Affiliated to CBSE / State Education Board
            </p>
            <p style={{ margin: 0, fontSize: '11.5px', color: '#777' }}>
              Tel: +91 11 2345 6789 | Email: careers@{letterDetails.schoolName.toLowerCase().replace(/\s+/g, '')}.edu.in
            </p>
          </div>

          {/* Letter Meta */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '24px' }}>
            <div>
              <strong>Ref. No.:</strong> {letterDetails.refNo}
            </div>
            <div>
              <strong>Date:</strong> {new Date(letterDetails.issueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </div>
          </div>

          {/* Recipient Address */}
          <div style={{ marginBottom: '22px', fontSize: '13.5px', lineHeight: '1.5' }}>
            <div>To,</div>
            <div style={{ fontWeight: 'bold', fontSize: '15px' }}>
              {letterDetails.recipientName}
              {(letterDetails.recipientName || '').toLowerCase().includes('ayup') && (
                <span className="no-print" style={{ marginLeft: '8px', backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '11px', padding: '1px 6px', borderRadius: '4px', border: '1px solid #7dd3fc', fontFamily: 'sans-serif' }}>
                  ★ Ayup Tech
                </span>
              )}
            </div>
            <div>Designation: {letterDetails.designation}</div>
            <div>Department: {letterDetails.department}</div>
          </div>

          {/* Subject Line */}
          <div style={{ textAlign: 'center', margin: '20px 0', fontWeight: 'bold', fontSize: '15px', textDecoration: 'underline' }}>
            {activeFormType === 'offer' 
              ? `SUBJECT: CONDITIONAL OFFER OF EMPLOYMENT AS ${letterDetails.designation.toUpperCase()}`
              : `SUBJECT: FORMAL APPOINTMENT LETTER FOR THE POSITION OF ${letterDetails.designation.toUpperCase()}`
            }
          </div>

          {/* Salutation & Body Content */}
          <div style={{ fontSize: '13.5px', lineHeight: '1.7', textAlign: 'justify' }}>
            <p>
              Dear <strong>{letterDetails.recipientName}</strong>,
            </p>

            {activeFormType === 'offer' ? (
              <>
                <p>
                  With reference to your application and subsequent interview discussions with our Selection Committee, we are delighted to offer you the position of <strong>{letterDetails.designation}</strong> in the Department of <strong>{letterDetails.department}</strong> at <strong>{letterDetails.schoolName}</strong>.
                </p>
                <p>
                  Your total Annual Cost to Company (CTC) will be <strong>{letterDetails.annualCtc}</strong> (inclusive of standard academic allowances, providential fund, and performance bonuses as applicable).
                </p>
                <p>
                  You are expected to join the institution on or before <strong>{new Date(letterDetails.joiningDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</strong>. Kindly submit your signed acceptance copy of this letter along with relevant academic certifications and proof of resignation within seven (7) business days.
                </p>
              </>
            ) : (
              <>
                <p>
                  We have the pleasure of confirming your appointment as <strong>{letterDetails.designation}</strong> in the Department of <strong>{letterDetails.department}</strong> at <strong>{letterDetails.schoolName}</strong> with effect from your date of joining <strong>{new Date(letterDetails.joiningDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</strong>.
                </p>
                <p>
                  Your employment will be governed by the Code of Conduct and Service Rules of the Institution, along with the standard provisions outlined below:
                </p>
              </>
            )}

            {/* Terms and Conditions List */}
            <div style={{ marginTop: '16px', marginBottom: '16px' }}>
              <strong>Standard Terms & Employment Conditions:</strong>
              <ol style={{ paddingLeft: '22px', margin: '8px 0' }}>
                {letterDetails.terms.map((t, idx) => (
                  <li key={idx} style={{ marginBottom: '6px' }}>{t}</li>
                ))}
              </ol>
            </div>

            <p>
              We look forward to a mutually fruitful and enduring professional association and wish you the very best in your pedagogical journey with our institution.
            </p>
          </div>

          {/* Signatures Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px', paddingTop: '20px' }}>
            <div style={{ textAlign: 'left', width: '220px' }}>
              <div style={{ height: '40px', borderBottom: '1px solid #333', marginBottom: '6px' }}></div>
              <div style={{ fontWeight: 'bold', fontSize: '13px' }}>Authorized Signatory</div>
              <div style={{ fontSize: '12px', color: '#555' }}>Head of Human Resources</div>
              <div style={{ fontSize: '11px', color: '#777' }}>{letterDetails.schoolName}</div>
            </div>

            <div style={{ textAlign: 'left', width: '220px' }}>
              <div style={{ height: '40px', borderBottom: '1px solid #333', marginBottom: '6px' }}></div>
              <div style={{ fontWeight: 'bold', fontSize: '13px' }}>Candidate Acceptance</div>
              <div style={{ fontSize: '12px', color: '#555' }}>Signature & Date</div>
              <div style={{ fontSize: '11px', color: '#777' }}>{letterDetails.recipientName}</div>
            </div>
          </div>

          {/* Watermark badge */}
          <div className="no-print" style={{ position: 'absolute', bottom: '15px', right: '20px', fontSize: '11px', color: '#94a3b8' }}>
            Generated dynamically via Noval ERP School_Soft
          </div>

        </div>

      </div>

    </div>
  );
}
