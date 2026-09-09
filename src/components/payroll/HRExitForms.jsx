import React, { useState, useEffect } from 'react';
import { Printer, FileCheck, CheckCircle2, AlertCircle, RefreshCw, User, Building, Briefcase, Calendar, ShieldCheck, CheckSquare, Edit3 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function HRExitForms() {
  const [activeFormType, setActiveFormType] = useState('exit'); // 'exit' or 'nodues'
  const [staffList, setStaffList] = useState([]);
  const [staffTypes, setStaffTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters / Selections
  const [selectedSchool, setSelectedSchool] = useState('Noval International School');
  const [selectedStaffType, setSelectedStaffType] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStaffId, setSelectedStaffId] = useState('');

  // Form Details
  const [formData, setFormData] = useState({
    schoolName: 'Noval International School',
    schoolAddress: 'Institutional Area, Knowledge Park, New Delhi - 110001',
    refNo: 'HR/EXIT/2026/042',
    date: new Date().toISOString().split('T')[0],
    employeeName: 'Ayup Tech',
    employeeId: 'EMP-AT-2026',
    designation: 'Senior Fullstack Lead',
    department: 'Information Technology',
    joiningDate: '2024-03-15',
    resignationDate: '2026-08-15',
    lastWorkingDate: '2026-09-15',
    noticePeriodServed: 'Yes (30 Days)',
    reasonForLeaving: 'Career Progression & Higher Responsibilities',
    handoverTo: 'Technical Lead Panel',
    handoverStatus: 'Completed 100%',
    overallRating: 'Excellent',
    rehireEligible: 'Yes (Highly Recommended)',
    hrRemarks: 'Employee Ayup Tech has performed exceptionally well with stellar technical achievements and team mentorship. All duties handed over smoothly.'
  });

  // Departmental Clearance Statuses for No Dues Certificate
  const [clearanceList, setClearanceList] = useState([
    { dept: 'Library Department', item: 'All borrowed books & journals returned', status: 'Cleared', dues: '₹0.00', signatory: 'Librarian' },
    { dept: 'IT & Systems', item: 'Laptop, peripherals, RFID access card surrendered, credentials revoked', status: 'Cleared', dues: '₹0.00', signatory: 'System Admin' },
    { dept: 'Laboratories / Equipment', item: 'Lab apparatus, instruments & testing kits accounted for', status: 'Cleared', dues: '₹0.00', signatory: 'Lab Incharge' },
    { dept: 'Transport & Facilities', item: 'Bus/Cab pass returned, facility locker key handed over', status: 'Cleared', dues: '₹0.00', signatory: 'Transport Officer' },
    { dept: 'Accounts & Finance', item: 'Salary advances recovered, tax documentation & final PF settlement verified', status: 'Cleared', dues: '₹0.00', signatory: 'Finance Manager' },
    { dept: 'Academic / Department HOD', item: 'Syllabus, exam question papers, student grades & registers completed', status: 'Cleared', dues: '₹0.00', signatory: 'Head of Dept (HOD)' }
  ]);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/staffs`, { headers });
        let sData = [];
        if (res.ok) {
          sData = await res.json();
          setStaffList(Array.isArray(sData) ? sData : []);
        }

        const tRes = await fetch(`${API_BASE}/api/staff-types`, { headers });
        if (tRes.ok) {
          const tData = await tRes.json();
          setStaffTypes(Array.isArray(tData) ? tData : []);
        }

        // Check if Ayup Tech exists in staff
        const ayupStaff = sData.find(s => {
          const name = `${s.basicInfo?.firstName || ''} ${s.basicInfo?.lastName || ''}`.toLowerCase();
          return name.includes('ayup');
        });

        if (ayupStaff) {
          setSelectedStaffId(ayupStaff._id);
          applyStaff(ayupStaff);
        } else if (sData.length > 0) {
          setSelectedStaffId(sData[0]._id);
          applyStaff(sData[0]);
        }
      } catch (err) {
        console.error('Error loading staff for exit form:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const applyStaff = (st) => {
    if (!st) return;
    const name = `${st.basicInfo?.firstName || ''} ${st.basicInfo?.lastName || ''}`.trim() || st.name || 'Staff Member';
    setFormData(prev => ({
      ...prev,
      employeeName: name,
      employeeId: st.employeeId || 'EMP-2026-01',
      designation: st.designation || st.jobTitle || 'Faculty Member',
      department: st.department || 'Academics',
      refNo: `HR/EXIT/2026/${st.employeeId || (st._id ? st._id.slice(-4).toUpperCase() : '001')}`
    }));
  };

  const handleStaffChange = (id) => {
    setSelectedStaffId(id);
    const st = staffList.find(s => s._id === id);
    if (st) applyStaff(st);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="global-settings-container hr-exit-root" style={{ display: 'flex', minHeight: '820px', padding: 0, backgroundColor: '#f1f5f9' }}>
      
      {/* Print styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .hr-exit-sheet, .hr-exit-sheet * {
            visibility: visible;
          }
          .hr-exit-sheet {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            margin: 0 !important;
            padding: 18mm !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Left Sidebar */}
      <div className="no-print" style={{ width: '320px', minWidth: '320px', padding: '24px 20px', backgroundColor: '#ffffff', borderRight: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileCheck size={18} color="#159BD7" /> HR Exit Clearance
          </h3>
          <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
            Generate Exit Interview & Departmental No Dues Form
          </p>
        </div>

        <div style={{ height: '1px', backgroundColor: '#e2e8f0' }} />

        {/* Dropdown Filters */}
        <div className="form-group">
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px', display: 'block' }}>
            School / Campus
          </label>
          <select
            className="settings-input"
            value={selectedSchool}
            onChange={(e) => {
              setSelectedSchool(e.target.value);
              setFormData(prev => ({ ...prev, schoolName: e.target.value }));
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
            Staff Type
          </label>
          <select
            className="settings-input"
            value={selectedStaffType}
            onChange={(e) => setSelectedStaffType(e.target.value)}
            style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          >
            <option value="All">All Staff Types</option>
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
                setFormData(prev => ({ ...prev, department: e.target.value }));
              }
            }}
            style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          >
            <option value="All">All Departments</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science & Physics">Science & Physics</option>
            <option value="Administration">Administration</option>
            <option value="Human Resources">Human Resources</option>
          </select>
        </div>

        <div className="form-group">
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px', display: 'block' }}>
            Select Employee <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <select
            className="settings-input"
            value={selectedStaffId}
            onChange={(e) => handleStaffChange(e.target.value)}
            style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: '500' }}
          >
            <option value="">-- Choose Employee --</option>
            {/* Always provide Ayup Tech option */}
            <option value="ayup_default">Ayup Tech (EMP-AT-2026) - Senior Fullstack Lead</option>
            {staffList.map(st => {
              const name = `${st.basicInfo?.firstName || ''} ${st.basicInfo?.lastName || ''}`.trim() || st.name || 'Staff';
              return (
                <option key={st._id} value={st._id}>
                  {name} ({st.employeeId || 'ID N/A'})
                </option>
              );
            })}
          </select>
        </div>

        {/* Form Selector Buttons */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
          <button
            onClick={() => setActiveFormType('exit')}
            style={{
              flex: 1,
              backgroundColor: activeFormType === 'exit' ? '#159BD7' : '#f1f5f9',
              color: activeFormType === 'exit' ? '#ffffff' : '#475569',
              border: `1px solid ${activeFormType === 'exit' ? '#159BD7' : '#cbd5e1'}`,
              padding: '9px 12px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '12.5px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Exit Form
          </button>
          <button
            onClick={() => setActiveFormType('nodues')}
            style={{
              flex: 1.2,
              backgroundColor: activeFormType === 'nodues' ? '#159BD7' : '#f1f5f9',
              color: activeFormType === 'nodues' ? '#ffffff' : '#475569',
              border: `1px solid ${activeFormType === 'nodues' ? '#159BD7' : '#cbd5e1'}`,
              padding: '9px 12px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '12.5px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            No Dues Form
          </button>
        </div>

        {/* Quick parameters editor */}
        <div style={{ marginTop: 'auto', backgroundColor: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Edit3 size={14} color="#159BD7" /> Exit Details
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#64748b' }}>Last Working Date</label>
              <input
                type="date"
                value={formData.lastWorkingDate}
                onChange={(e) => setFormData({ ...formData, lastWorkingDate: e.target.value })}
                style={{ width: '100%', padding: '4px 8px', fontSize: '12px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#64748b' }}>Reason for Leaving</label>
              <input
                type="text"
                value={formData.reasonForLeaving}
                onChange={(e) => setFormData({ ...formData, reasonForLeaving: e.target.value })}
                style={{ width: '100%', padding: '4px 8px', fontSize: '12px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#64748b' }}>Handover Status</label>
              <input
                type="text"
                value={formData.handoverStatus}
                onChange={(e) => setFormData({ ...formData, handoverStatus: e.target.value })}
                style={{ width: '100%', padding: '4px 8px', fontSize: '12px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>
          </div>
        </div>

        {/* Print Button */}
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

      {/* Main Document Preview Area */}
      <div style={{ flexGrow: 1, padding: '30px', overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
        
        <div
          className="hr-exit-sheet"
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

          {/* Letterhead */}
          <div style={{ textAlign: 'center', borderBottom: '2px solid #159BD7', paddingBottom: '14px', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: '#159BD7', margin: '0 0 4px 0', letterSpacing: '0.5px' }}>
              {formData.schoolName.toUpperCase()}
            </h1>
            <p style={{ margin: '0 0 3px 0', fontSize: '12px', color: '#555' }}>
              {formData.schoolAddress}
            </p>
            <p style={{ margin: 0, fontSize: '11px', color: '#777' }}>
              HUMAN RESOURCE & RELIEVING CLEARANCE DIVISION
            </p>
          </div>

          {/* Doc Title & Meta */}
          <div style={{ textAlign: 'center', marginBottom: '18px' }}>
            <span style={{
              fontSize: '15px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              textDecoration: 'underline',
              letterSpacing: '0.5px'
            }}>
              {activeFormType === 'exit' ? 'EMPLOYEE EXIT INTERVIEW & HANDOVER FORM' : 'DEPARTMENTAL NO DUES CLEARANCE CERTIFICATE'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
            <div><strong>Clearance Ref No:</strong> {formData.refNo}</div>
            <div><strong>Date:</strong> {new Date(formData.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
          </div>

          {/* Employee Info Grid */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '13px' }}>
            <tbody>
              <tr>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', width: '22%', fontWeight: 'bold' }}>Employee Name:</td>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', width: '28%' }}>
                  <strong>{formData.employeeName}</strong>
                  {(formData.employeeName || '').toLowerCase().includes('ayup') && (
                    <span className="no-print" style={{ marginLeft: '6px', backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '10.5px', padding: '1px 5px', borderRadius: '4px', border: '1px solid #7dd3fc', fontFamily: 'sans-serif' }}>
                      ★ Ayup Tech
                    </span>
                  )}
                </td>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', width: '22%', fontWeight: 'bold' }}>Employee ID:</td>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', width: '28%' }}>{formData.employeeId}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontWeight: 'bold' }}>Designation:</td>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1' }}>{formData.designation}</td>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontWeight: 'bold' }}>Department:</td>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1' }}>{formData.department}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontWeight: 'bold' }}>Date of Resignation:</td>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1' }}>{formData.resignationDate}</td>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontWeight: 'bold' }}>Last Working Date:</td>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1' }}>{formData.lastWorkingDate}</td>
              </tr>
            </tbody>
          </table>

          {activeFormType === 'exit' ? (
            /* EXIT INTERVIEW & HANDOVER SECTION */
            <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
              
              <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '8px', color: '#0f172a' }}>
                Section 1: Reason for Departure & Transition Details
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', width: '30%', fontWeight: 'bold' }}>Primary Reason:</td>
                    <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1' }}>{formData.reasonForLeaving}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontWeight: 'bold' }}>Notice Period Served:</td>
                    <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1' }}>{formData.noticePeriodServed}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontWeight: 'bold' }}>Successor / Handover To:</td>
                    <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1' }}>{formData.handoverTo}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontWeight: 'bold' }}>Handover Status:</td>
                    <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1' }}>{formData.handoverStatus}</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '8px', color: '#0f172a' }}>
                Section 2: Employee Institutional Feedback & Evaluation
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f1f5f9' }}>
                    <th style={{ padding: '6px 10px', border: '1px solid #cbd5e1', textAlign: 'left' }}>Evaluation Parameter</th>
                    <th style={{ padding: '6px 10px', border: '1px solid #cbd5e1', textAlign: 'center', width: '100px' }}>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1' }}>Work Environment & Department Collaboration</td>
                    <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', textAlign: 'center' }}>Excellent</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1' }}>Resources, Hardware & Technical Facilities</td>
                    <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', textAlign: 'center' }}>Very Good</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1' }}>Leadership & Academic Management Support</td>
                    <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', textAlign: 'center' }}>Excellent</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1' }}>Overall Employment Experience</td>
                    <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', textAlign: 'center' }}>{formData.overallRating}</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '6px', color: '#0f172a' }}>
                Section 3: HR Exit Evaluation & Relieving Recommendation
              </div>
              <div style={{ padding: '10px', border: '1px solid #cbd5e1', backgroundColor: '#fdfdfe', marginBottom: '30px' }}>
                <p style={{ margin: '0 0 6px 0' }}>{formData.hrRemarks}</p>
                <p style={{ margin: 0 }}><strong>Eligible for Rehire:</strong> {formData.rehireEligible}</p>
              </div>

            </div>
          ) : (
            /* NO DUES CLEARANCE CERTIFICATE SECTION */
            <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '8px', color: '#0f172a' }}>
                Departmental Clearances Checklist
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f1f5f9' }}>
                    <th style={{ padding: '8px 10px', border: '1px solid #cbd5e1', textAlign: 'left' }}>Department</th>
                    <th style={{ padding: '8px 10px', border: '1px solid #cbd5e1', textAlign: 'left' }}>Clearance Scope / Assets</th>
                    <th style={{ padding: '8px 10px', border: '1px solid #cbd5e1', textAlign: 'center', width: '85px' }}>Dues</th>
                    <th style={{ padding: '8px 10px', border: '1px solid #cbd5e1', textAlign: 'center', width: '90px' }}>Status</th>
                    <th style={{ padding: '8px 10px', border: '1px solid #cbd5e1', textAlign: 'center', width: '120px' }}>Signatory</th>
                  </tr>
                </thead>
                <tbody>
                  {clearanceList.map((c, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: '7px 10px', border: '1px solid #cbd5e1', fontWeight: 'bold' }}>{c.dept}</td>
                      <td style={{ padding: '7px 10px', border: '1px solid #cbd5e1' }}>{c.item}</td>
                      <td style={{ padding: '7px 10px', border: '1px solid #cbd5e1', textAlign: 'center' }}>{c.dues}</td>
                      <td style={{ padding: '7px 10px', border: '1px solid #cbd5e1', textAlign: 'center', color: '#16a34a', fontWeight: 'bold' }}>
                        ✓ {c.status}
                      </td>
                      <td style={{ padding: '7px 10px', border: '1px solid #cbd5e1', textAlign: 'center', fontStyle: 'italic', color: '#475569' }}>
                        {c.signatory}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ padding: '12px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', marginBottom: '30px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>HR Clear & Relieve Declaration:</div>
                <p style={{ margin: 0 }}>
                  It is certified that the above employee <strong>{formData.employeeName}</strong> has completed all departmental handover protocols and cleared all financial, technical, and asset liabilities against <strong>{formData.schoolName}</strong>. The Accounts Division is authorized to release final full & final settlement (FnF).
                </p>
              </div>
            </div>
          )}

          {/* Signatures */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '16px' }}>
            <div style={{ textAlign: 'left', width: '200px' }}>
              <div style={{ height: '35px', borderBottom: '1px solid #333', marginBottom: '4px' }}></div>
              <div style={{ fontWeight: 'bold', fontSize: '12.5px' }}>Employee Signature</div>
              <div style={{ fontSize: '11px', color: '#555' }}>{formData.employeeName}</div>
            </div>

            <div style={{ textAlign: 'left', width: '200px' }}>
              <div style={{ height: '35px', borderBottom: '1px solid #333', marginBottom: '4px' }}></div>
              <div style={{ fontWeight: 'bold', fontSize: '12.5px' }}>Head of Department</div>
              <div style={{ fontSize: '11px', color: '#555' }}>Signature & Date</div>
            </div>

            <div style={{ textAlign: 'left', width: '200px' }}>
              <div style={{ height: '35px', borderBottom: '1px solid #333', marginBottom: '4px' }}></div>
              <div style={{ fontWeight: 'bold', fontSize: '12.5px' }}>Principal / Director</div>
              <div style={{ fontSize: '11px', color: '#555' }}>Final Authorization</div>
            </div>
          </div>

          <div className="no-print" style={{ position: 'absolute', bottom: '12px', right: '20px', fontSize: '10.5px', color: '#94a3b8' }}>
            Generated dynamically via Noval ERP School_Soft
          </div>

        </div>

      </div>

    </div>
  );
}
