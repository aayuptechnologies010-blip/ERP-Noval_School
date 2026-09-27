import React, { useState, useEffect } from 'react';
import { Search, Save, RotateCcw, Eye, FileText, Check } from 'lucide-react';
import Swal from 'sweetalert2';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function FeeEntry() {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);
  const [banks, setBanks] = useState([]);
  const [installments, setInstallments] = useState([]);
  const [students, setStudents] = useState([]);

  // Filters & Selected State
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedSection, setSelectedSection] = useState('All Section');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [matchingStudents, setMatchingStudents] = useState([]);

  // Form Fields
  const [entryMode, setEntryMode] = useState('School');
  const [recDate, setRecDate] = useState(() => {
    const today = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${String(today.getDate()).padStart(2, '0')}-${months[today.getMonth()]}-${today.getFullYear()}`;
  });
  const [payMode, setPayMode] = useState('Cash');
  const [selectedFeeType, setSelectedFeeType] = useState('All Fee Types');
  const [receiptNo, setReceiptNo] = useState('0');
  const [remark, setRemark] = useState('');
  const [depositBank, setDepositBank] = useState('');
  const [selectedInstallment, setSelectedInstallment] = useState('September');
  
  const [discountChecked, setDiscountChecked] = useState(false);
  const [discountAmount, setDiscountAmount] = useState('0.00');
  const [manualLateFineChecked, setManualLateFineChecked] = useState(false);
  const [manualLateFine, setManualLateFine] = useState('0');
  const [reuseReceipt, setReuseReceipt] = useState(false);
  const [todaysCollection, setTodaysCollection] = useState('0');

  // Fee Heads Table Breakdown
  const [feeHeads, setFeeHeads] = useState([]);
  
  // Amounts
  const [totalAmtBeingPaid, setTotalAmtBeingPaid] = useState('0.00');
  const [duesAmt, setDuesAmt] = useState('0.00');
  const [advanceAmt, setAdvanceAmt] = useState('0.00');

  const [loading, setLoading] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  const [historyReceipts, setHistoryReceipts] = useState([]);

  useEffect(() => {
    fetchInitialDropdowns();
  }, []);

  const fetchInitialDropdowns = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const [clsRes, secRes, ftRes, bnkRes, instRes, stdRes] = await Promise.all([
        fetch(`${API_URL}/api/school-classes`, { headers }).catch(() => ({ ok: false })),
        fetch(`${API_URL}/api/class-sections`, { headers }).catch(() => ({ ok: false })),
        fetch(`${API_URL}/api/fee-types`, { headers }).catch(() => ({ ok: false })),
        fetch(`${API_URL}/api/banks`, { headers }).catch(() => ({ ok: false })),
        fetch(`${API_URL}/api/fee-installments`, { headers }).catch(() => ({ ok: false })),
        fetch(`${API_URL}/api/students`, { headers }).catch(() => ({ ok: false }))
      ]);

      if (clsRes.ok) {
        const d = await clsRes.json();
        setClasses(Array.isArray(d) ? d : []);
      }
      if (secRes.ok) {
        const d = await secRes.json();
        setSections(Array.isArray(d) ? d : []);
      }
      if (ftRes.ok) {
        const d = await ftRes.json();
        setFeeTypes(Array.isArray(d) ? d : []);
      }
      if (bnkRes.ok) {
        const d = await bnkRes.json();
        setBanks(Array.isArray(d) ? d : []);
      }
      if (instRes.ok) {
        const d = await instRes.json();
        setInstallments(Array.isArray(d) ? d : []);
      }
      if (stdRes.ok) {
        const d = await stdRes.json();
        setStudents(Array.isArray(d) ? d : []);
      }
    } catch (err) {
      console.error('Error fetching fee entry master data:', err);
    }
  };

  // Real-time filtering when user types or changes class/section
  const handleInputChange = (val) => {
    setSearchQuery(val);
    const q = val.trim().toLowerCase();
    
    if (!q && selectedClass === 'All Classes' && selectedSection === 'All Section') {
      setMatchingStudents([]);
      setShowDropdown(false);
      return;
    }

    const filtered = students.filter(s => {
      const fn = `${s.personalDetails?.firstName || s.firstName || ''} ${s.personalDetails?.middleName || ''} ${s.personalDetails?.lastName || s.lastName || ''}`.toLowerCase();
      const adm = `${s.academicDetails?.admissionNumber || s.admissionNumber || ''}`.toLowerCase();
      const roll = `${s.academicDetails?.rollNumber || s.rollNumber || ''}`.toLowerCase();
      const stClass = `${s.academicDetails?.class || s.className || ''}`.toLowerCase();
      const stSection = `${s.academicDetails?.section || s.sectionName || ''}`.toLowerCase();

      const matchClass = selectedClass === 'All Classes' || stClass === selectedClass.toLowerCase();
      const matchSection = selectedSection === 'All Section' || stSection === selectedSection.toLowerCase();
      
      const matchText = !q || fn.includes(q) || adm.includes(q) || roll.includes(q);

      return matchClass && matchSection && matchText;
    });

    setMatchingStudents(filtered.slice(0, 15));
    setShowDropdown(filtered.length > 0);
  };

  const handleSelectStudent = (s) => {
    setShowDropdown(false);
    populateStudentData(s);
  };

  const handleSearch = async () => {
    const q = searchQuery.trim().toLowerCase();
    if (!q && selectedClass === 'All Classes' && selectedSection === 'All Section') {
      Swal.fire('Search', 'Please enter a student name, roll number, or admission no', 'info');
      return;
    }

    const found = students.find(s => {
      const fn = `${s.personalDetails?.firstName || s.firstName || ''} ${s.personalDetails?.lastName || s.lastName || ''}`.toLowerCase();
      const adm = `${s.academicDetails?.admissionNumber || s.admissionNumber || ''}`.toLowerCase();
      const roll = `${s.academicDetails?.rollNumber || s.rollNumber || ''}`.toLowerCase();
      return fn.includes(q) || adm === q || roll === q;
    });

    if (found) {
      setShowDropdown(false);
      populateStudentData(found);
    } else {
      Swal.fire('Not Found', 'No student matching criteria found', 'warning');
    }
  };

  const populateStudentData = async (s) => {
    setSelectedStudent(s);
    setSearchQuery(`${s.personalDetails?.firstName || s.firstName || ''} ${s.personalDetails?.lastName || s.lastName || ''}`.trim());
    setReceiptNo(Math.floor(1000 + Math.random() * 9000).toString());

    // Fetch ledger / dues
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/fee-transactions/ledger/${s._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const ledgerData = await res.json();
        setHistoryReceipts(ledgerData.transactions || []);
      }
    } catch (e) {
      console.error(e);
    }

    // Prepare default heads structure (Tuition + Transport if transport student)
    const isTransport = s.transportDetails?.isTransportStudent || s.transportDetails?.route;
    const transportAmt = Number(s.transportDetails?.transportFee || 600);
    const tuitionAmt = 1200;

    const defaultHeads = [
      {
        head: 'TUITION FEE',
        actualAmt: tuitionAmt,
        concAmt: 0,
        lastRecAmt: 0,
        payableAmt: tuitionAmt,
        amtBeingPaid: tuitionAmt,
        feesType: 'School Fee',
        paySchedule: 'Installment'
      }
    ];

    if (isTransport || s.transportDetails?.stopName || s.transportDetails?.route) {
      defaultHeads.push({
        head: 'Transport',
        actualAmt: transportAmt,
        concAmt: 0,
        lastRecAmt: 0,
        payableAmt: transportAmt,
        amtBeingPaid: transportAmt,
        feesType: 'School Fee',
        paySchedule: 'Installment'
      });
    }

    setFeeHeads(defaultHeads);
    calculateTotals(defaultHeads, 0, 0);
  };

  const calculateTotals = (heads, disc, fine) => {
    const totalActual = heads.reduce((acc, h) => acc + (Number(h.payableAmt) || 0), 0);
    const totalPaid = heads.reduce((acc, h) => acc + (Number(h.amtBeingPaid) || 0), 0);
    const totalWithFine = totalPaid + Number(fine || 0) - Number(disc || 0);

    setTotalAmtBeingPaid(totalWithFine.toFixed(2));
    setDuesAmt((totalActual - totalPaid).toFixed(2));
    setAdvanceAmt('0.00');
  };

  const handleHeadAmtChange = (index, value) => {
    const updated = [...feeHeads];
    updated[index].amtBeingPaid = Number(value) || 0;
    setFeeHeads(updated);
    calculateTotals(updated, discountChecked ? discountAmount : 0, manualLateFineChecked ? manualLateFine : 0);
  };

  const handleDiscountChange = (val) => {
    setDiscountAmount(val);
    calculateTotals(feeHeads, discountChecked ? val : 0, manualLateFineChecked ? manualLateFine : 0);
  };

  const handleFineChange = (val) => {
    setManualLateFine(val);
    calculateTotals(feeHeads, discountChecked ? discountAmount : 0, manualLateFineChecked ? val : 0);
  };

  const handleSave = async () => {
    if (!selectedStudent) {
      Swal.fire('Selection Required', 'Please search and select a student first', 'warning');
      return;
    }

    if (Number(totalAmtBeingPaid) <= 0) {
      Swal.fire('Invalid Amount', 'Amount being paid must be greater than 0', 'warning');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/fee-transactions/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          studentId: selectedStudent._id,
          amountPaid: Number(totalAmtBeingPaid),
          paymentMode: payMode,
          remarks: remark,
          bankName: depositBank,
          discountAmount: discountChecked ? Number(discountAmount) : 0,
          receiptNo: receiptNo
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Fee deposit failed');

      Swal.fire({
        title: 'Success!',
        text: `Fee Collected Successfully! Receipt No: ${data.receipt?.receiptNo || receiptNo}`,
        icon: 'success',
        confirmButtonColor: '#29a9d8'
      });

      setTodaysCollection((prev) => (Number(prev) + Number(totalAmtBeingPaid)).toFixed(2));
      handleReset();
    } catch (err) {
      Swal.fire('Error', err.message || 'Payment processing failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedStudent(null);
    setSearchQuery('');
    setFeeHeads([]);
    setTotalAmtBeingPaid('0.00');
    setDuesAmt('0.00');
    setAdvanceAmt('0.00');
    setReceiptNo('0');
    setRemark('');
    setDiscountChecked(false);
    setDiscountAmount('0.00');
    setManualLateFineChecked(false);
    setManualLateFine('0');
  };

  const formatDateStr = (dateVal) => {
    if (!dateVal) return 'N/A';
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return String(dateVal);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${String(d.getDate()).padStart(2, '0')}-${months[d.getMonth()]}-${d.getFullYear()}`;
  };

  // Helper for student metadata
  const personal = selectedStudent?.personalDetails || selectedStudent || {};
  const academic = selectedStudent?.academicDetails || {};
  const family = selectedStudent?.familyDetails || {};
  const contact = selectedStudent?.contactAddress || {};
  const transport = selectedStudent?.transportDetails || {};

  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', padding: '16px', fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      
      {/* Top Outer Container Card */}
      <div style={{ background: '#fff', borderRadius: '6px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        
        {/* Main 2-Column Split */}
        <div style={{ display: 'grid', gridTemplateColumns: '290px 1fr', minHeight: '620px' }}>
          
          {/* ================= LEFT COLUMN: STUDENT PROFILE & METADATA ================= */}
          <div style={{ background: '#fff', borderRight: '1px solid #e2e8f0', padding: '16px', display: 'flex', flexDirection: 'column' }}>
            
            {/* Student Photo / Placeholder */}
            <div style={{ width: '150px', height: '150px', margin: '0 auto 16px auto', border: '1px solid #cbd5e1', borderRadius: '4px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', position: 'relative' }}>
              {personal.studentPhoto ? (
                <img 
                  src={personal.studentPhoto.startsWith('http') ? personal.studentPhoto : `${API_URL}/${personal.studentPhoto}`} 
                  alt="Student" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                  {/* Crest Watermark Design */}
                  <div style={{ position: 'relative', width: '80px', height: '90px', border: '2px solid #e2e8f0', borderTop: 'none', borderRadius: '0 0 40px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '100%', height: '2px', background: '#fca5a5', position: 'absolute', top: '25px', transform: 'rotate(-25deg)' }}></div>
                    <div style={{ width: '100%', height: '2px', background: '#fca5a5', position: 'absolute', top: '25px', transform: 'rotate(25deg)' }}></div>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#1e293b', textAlign: 'center', zIndex: 2 }}>
                      No Image<br />Available
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Left Metadata Field List */}
            <div style={{ fontSize: '12px', color: '#1e293b', lineHeight: 1.6, overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
              <div style={{ borderBottom: '1px solid #f1f5f9', padding: '4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <strong style={{ minWidth: '95px', color: '#334155' }}>Name:</strong>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>
                  {personal.firstName ? `${personal.firstName} ${personal.middleName || ''} ${personal.lastName || ''}`.trim() : ''}
                </span>
                {personal.firstName && (
                  <span style={{ background: '#ef4444', color: '#fff', fontSize: '9px', fontWeight: 'bold', padding: '1px 5px', borderRadius: '10px' }}>new</span>
                )}
              </div>

              <div style={{ borderBottom: '1px solid #f1f5f9', padding: '4px 0' }}>
                <strong style={{ display: 'inline-block', minWidth: '95px', color: '#334155' }}>Class:</strong>
                <span style={{ color: '#0f172a', fontWeight: 500 }}>
                  {academic.class || selectedStudent?.className || ''}{academic.section ? `-${academic.section}` : ''}
                </span>
              </div>

              <div style={{ borderBottom: '1px solid #f1f5f9', padding: '4px 0' }}>
                <strong style={{ display: 'inline-block', minWidth: '95px', color: '#334155' }}>Roll No.:</strong>
                <span style={{ color: '#0f172a' }}>{academic.rollNumber || selectedStudent?.rollNumber || ''}</span>
              </div>

              <div style={{ borderBottom: '1px solid #f1f5f9', padding: '4px 0' }}>
                <strong style={{ display: 'inline-block', minWidth: '95px', color: '#334155' }}>Admission No.:</strong>
                <span style={{ color: '#0f172a', fontWeight: 600 }}>{academic.admissionNumber || selectedStudent?.admissionNumber || ''}</span>
              </div>

              <div style={{ borderBottom: '1px solid #f1f5f9', padding: '4px 0' }}>
                <strong style={{ display: 'inline-block', minWidth: '95px', color: '#334155' }}>Status :</strong>
                <span style={{ color: academic.currentStatus === 'LEAVED' ? '#ef4444' : '#16a34a', fontWeight: 'bold' }}>
                  {academic.currentStatus || 'Active'}
                </span>
              </div>

              <div style={{ borderBottom: '1px solid #f1f5f9', padding: '4px 0' }}>
                <strong style={{ display: 'inline-block', minWidth: '95px', color: '#334155' }}>Last Modified Date :</strong>
                <span style={{ color: '#64748b', fontSize: '11px' }}>
                  {selectedStudent ? `${formatDateStr(selectedStudent.updatedAt || selectedStudent.createdAt)} 12:43:27` : ''}
                </span>
              </div>

              <div style={{ borderBottom: '1px solid #f1f5f9', padding: '4px 0' }}>
                <strong style={{ display: 'inline-block', minWidth: '95px', color: '#334155' }}>Address:</strong>
                <span style={{ color: '#334155' }}>
                  {contact.currentAddress || contact.permanentAddress || contact.address || ''}
                </span>
              </div>

              <div style={{ borderBottom: '1px solid #f1f5f9', padding: '4px 0' }}>
                <strong style={{ display: 'inline-block', minWidth: '95px', color: '#334155' }}>Father's Name:</strong>
                <span style={{ color: '#0f172a' }}>
                  {family.father?.firstName ? `${family.father.firstName} ${family.father.lastName || ''}`.trim() : (selectedStudent?.fatherName || '')}
                </span>
              </div>

              <div style={{ borderBottom: '1px solid #f1f5f9', padding: '4px 0' }}>
                <strong style={{ display: 'inline-block', minWidth: '95px', color: '#334155' }}>Mother's Name:</strong>
                <span style={{ color: '#0f172a' }}>
                  {family.mother?.firstName ? `${family.mother.firstName} ${family.mother.lastName || ''}`.trim() : (selectedStudent?.motherName || '')}
                </span>
              </div>

              <div style={{ borderBottom: '1px solid #f1f5f9', padding: '4px 0' }}>
                <strong style={{ display: 'inline-block', minWidth: '95px', color: '#334155' }}>Contact No.:</strong>
                <span style={{ color: '#0f172a' }}>{contact.contactNumber || family.father?.mobile || family.mother?.mobile || ''}</span>
              </div>

              <div style={{ borderBottom: '1px solid #f1f5f9', padding: '4px 0' }}>
                <strong style={{ display: 'inline-block', minWidth: '95px', color: '#334155' }}>Bill No.:</strong>
                <span style={{ color: '#0f172a' }}>{selectedStudent?.uniqueIds?.billGrNumber || ''}</span>
              </div>

              <div style={{ borderBottom: '1px solid #f1f5f9', padding: '4px 0' }}>
                <strong style={{ display: 'inline-block', minWidth: '95px', color: '#334155' }}>Fees Group:</strong>
                <span style={{ color: '#0f172a', fontWeight: 600 }}>{academic.class ? `NEW_${academic.class}` : ''}</span>
              </div>

              <div style={{ borderBottom: '1px solid #f1f5f9', padding: '4px 0' }}>
                <strong style={{ display: 'inline-block', minWidth: '95px', color: '#334155' }}>Route Name:</strong>
                <span style={{ color: '#0f172a' }}>{transport.routeName || transport.route || ''}</span>
              </div>

              <div style={{ borderBottom: '1px solid #f1f5f9', padding: '4px 0' }}>
                <strong style={{ display: 'inline-block', minWidth: '95px', color: '#334155' }}>Stop Name:</strong>
                <span style={{ color: '#0f172a' }}>{transport.stopName || transport.pickupPoint || ''}</span>
              </div>

              <div style={{ borderBottom: '1px solid #f1f5f9', padding: '4px 0' }}>
                <strong style={{ display: 'inline-block', minWidth: '95px', color: '#334155' }}>Father Mobile:</strong>
                <span style={{ color: '#0f172a' }}>{family.father?.mobile || ''}</span>
              </div>

              <div style={{ borderBottom: '1px solid #f1f5f9', padding: '4px 0' }}>
                <strong style={{ display: 'inline-block', minWidth: '95px', color: '#334155' }}>Mother Mobile:</strong>
                <span style={{ color: '#0f172a' }}>{family.mother?.mobile || ''}</span>
              </div>

              <div style={{ borderBottom: '1px solid #f1f5f9', padding: '4px 0' }}>
                <strong style={{ display: 'inline-block', minWidth: '95px', color: '#334155' }}>DOB:</strong>
                <span style={{ color: '#0f172a' }}>{personal.dateOfBirth ? formatDateStr(personal.dateOfBirth) : ''}</span>
              </div>

              <div style={{ borderBottom: '1px solid #f1f5f9', padding: '4px 0' }}>
                <strong style={{ display: 'inline-block', minWidth: '95px', color: '#334155' }}>DOA:</strong>
                <span style={{ color: '#0f172a' }}>{academic.dateOfAdmission ? formatDateStr(academic.dateOfAdmission) : ''}</span>
              </div>

              <div style={{ borderBottom: '1px solid #f1f5f9', padding: '4px 0' }}>
                <strong style={{ display: 'inline-block', minWidth: '95px', color: '#334155' }}>DOJ:</strong>
                <span style={{ color: '#0f172a' }}>{academic.dateOfJoining ? formatDateStr(academic.dateOfJoining) : ''}</span>
              </div>

              <div style={{ padding: '4px 0' }}>
                <strong style={{ display: 'inline-block', minWidth: '95px', color: '#334155' }}>Category:</strong>
                <span style={{ color: '#0f172a' }}>{personal.schoolCategory || personal.caste || ''}</span>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: FEE ENTRY FORM & ACTIONS ================= */}
          <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px', background: '#fff' }}>
            
            {/* 1. Top Filter & Search Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: '150px 140px 1fr', gap: '10px', alignItems: 'center' }}>
              <select 
                value={selectedClass} 
                onChange={(e) => setSelectedClass(e.target.value)}
                style={{ padding: '6px 8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', background: '#fff', color: '#334155', outline: 'none' }}
              >
                <option value="All Classes">All Classes</option>
                {classes.map(c => (
                  <option key={c._id} value={c.name || c.className}>{c.name || c.className}</option>
                ))}
              </select>

              <select 
                value={selectedSection} 
                onChange={(e) => setSelectedSection(e.target.value)}
                style={{ padding: '6px 8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', background: '#fff', color: '#334155', outline: 'none' }}
              >
                <option value="All Section">All Section</option>
                {sections.map(s => (
                  <option key={s._id} value={s.name || s.sectionName}>{s.name || s.sectionName}</option>
                ))}
              </select>

              <div style={{ display: 'flex', position: 'relative' }}>
                <input 
                  type="text"
                  placeholder="Enter Student Name / Roll No / Adm No..."
                  value={searchQuery}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onFocus={() => {
                    if (searchQuery.trim()) setShowDropdown(true);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  style={{ flex: 1, padding: '6px 10px', border: '1px solid #cbd5e1', borderRight: 'none', borderRadius: '4px 0 0 4px', fontSize: '12px', outline: 'none' }}
                />
                <button 
                  onClick={handleSearch}
                  disabled={loading}
                  style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '0 14px', borderRadius: '0 4px 4px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Search Student"
                >
                  <Search size={15} />
                </button>

                {/* Auto-suggest dropdown */}
                {showDropdown && matchingStudents.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: '#fff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0 0 6px 6px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    zIndex: 9999,
                    maxHeight: '260px',
                    overflowY: 'auto'
                  }}>
                    {matchingStudents.map((st) => {
                      const name = `${st.personalDetails?.firstName || st.firstName || ''} ${st.personalDetails?.lastName || st.lastName || ''}`.trim();
                      const adm = st.academicDetails?.admissionNumber || st.admissionNumber || '-';
                      const roll = st.academicDetails?.rollNumber || st.rollNumber || '-';
                      const cls = st.academicDetails?.class || st.className || '';
                      const sec = st.academicDetails?.section || st.sectionName || '';

                      return (
                        <div
                          key={st._id}
                          onClick={() => handleSelectStudent(st)}
                          style={{
                            padding: '8px 12px',
                            borderBottom: '1px solid #f1f5f9',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '12px',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#f0f9ff'}
                          onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                        >
                          <div>
                            <span style={{ fontWeight: 600, color: '#0f172a' }}>{name}</span>
                            <span style={{ marginLeft: '8px', color: '#64748b', fontSize: '11px' }}>({cls}-{sec})</span>
                          </div>
                          <div style={{ color: '#475569', fontSize: '11px' }}>
                            <span style={{ marginRight: '10px' }}>Adm: <b>{adm}</b></span>
                            <span>Roll: <b>{roll}</b></span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* 2. Three Column Inputs Form Row 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>Entry Mode</label>
                <select 
                  value={entryMode} 
                  onChange={(e) => setEntryMode(e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', outline: 'none', background: '#fff' }}
                >
                  <option value="School">School</option>
                  <option value="Bank">Bank</option>
                  <option value="Online">Online</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>Rec. Date</label>
                <input 
                  type="text" 
                  value={recDate}
                  onChange={(e) => setRecDate(e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>Pay Mode</label>
                <select 
                  value={payMode} 
                  onChange={(e) => setPayMode(e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', outline: 'none', background: '#fff' }}
                >
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Online">Online</option>
                  <option value="DD">DD</option>
                  <option value="Card">Card</option>
                </select>
              </div>
            </div>

            {/* 3. Row 2: Fees Type, Receipt No, Remark, Deposit Bank */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 0.8fr 1.2fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>Fees Type</label>
                <select 
                  value={selectedFeeType} 
                  onChange={(e) => setSelectedFeeType(e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', outline: 'none', background: '#fff' }}
                >
                  <option value="All Fee Types">All Fee Types</option>
                  {feeTypes.map(ft => (
                    <option key={ft._id} value={ft.name}>{ft.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>Receipt No.</label>
                <input 
                  type="text" 
                  value={receiptNo}
                  onChange={(e) => setReceiptNo(e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>Remark</label>
                <input 
                  type="text" 
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>Deposit Bank</label>
                <select 
                  value={depositBank} 
                  onChange={(e) => setDepositBank(e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', outline: 'none', background: '#fff' }}
                >
                  <option value="">Select Bank</option>
                  {banks.map(b => (
                    <option key={b._id} value={b.bankName}>{b.bankName}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 4. Row 3: Installment Select */}
            <div style={{ maxWidth: '280px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>Installment</label>
              <select 
                value={selectedInstallment} 
                onChange={(e) => setSelectedInstallment(e.target.value)}
                style={{ width: '100%', padding: '6px 8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', outline: 'none', background: '#fff' }}
              >
                <option value="September">September</option>
                <option value="None selected">None selected</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
              </select>
            </div>

            {/* 5. Row 4: Discount & Manual Late Fine Checkboxes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>Discount</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input 
                    type="checkbox" 
                    checked={discountChecked} 
                    onChange={(e) => {
                      setDiscountChecked(e.target.checked);
                      calculateTotals(feeHeads, e.target.checked ? discountAmount : 0, manualLateFineChecked ? manualLateFine : 0);
                    }}
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <input 
                    type="number" 
                    value={discountAmount}
                    disabled={!discountChecked}
                    onChange={(e) => handleDiscountChange(e.target.value)}
                    style={{ width: '120px', padding: '5px 8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', outline: 'none', background: discountChecked ? '#fff' : '#f1f5f9' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>Manual Late Fine</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input 
                    type="checkbox" 
                    checked={manualLateFineChecked} 
                    onChange={(e) => {
                      setManualLateFineChecked(e.target.checked);
                      calculateTotals(feeHeads, discountChecked ? discountAmount : 0, e.target.checked ? manualLateFine : 0);
                    }}
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <input 
                    type="number" 
                    value={manualLateFine}
                    disabled={!manualLateFineChecked}
                    onChange={(e) => handleFineChange(e.target.value)}
                    style={{ width: '120px', padding: '5px 8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', outline: 'none', background: manualLateFineChecked ? '#fff' : '#f1f5f9' }}
                  />
                </div>
              </div>
            </div>

            {/* 6. Reuse Receipt & Action Bar Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#334155', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={reuseReceipt} 
                  onChange={(e) => setReuseReceipt(e.target.checked)}
                  style={{ width: '15px', height: '15px' }}
                />
                Reuse Receipt
              </label>

              <span style={{ fontSize: '12px', color: '#334155', fontWeight: 600 }}>
                Today's Collection : <span style={{ color: '#0f172a' }}>{todaysCollection}</span>
              </span>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={handleSearch}
                  style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                >
                  <Eye size={14} /> Show
                </button>
                {selectedStudent && (
                  <button 
                    onClick={() => setHistoryModal(true)}
                    style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                  >
                    <Eye size={14} /> View History
                  </button>
                )}
              </div>
            </div>

            {/* 7. Fee Heads Table Breakdown (Pics 4 & 5) */}
            <div style={{ flex: 1, minHeight: '140px', overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#334155' }}>
                    <th style={{ padding: '8px 10px', fontWeight: 'bold' }}>Head</th>
                    <th style={{ padding: '8px 10px', fontWeight: 'bold', textAlign: 'right' }}>Actual Amt.</th>
                    <th style={{ padding: '8px 10px', fontWeight: 'bold', textAlign: 'right' }}>Conc. Amt.</th>
                    <th style={{ padding: '8px 10px', fontWeight: 'bold', textAlign: 'right' }}>Last Rec.Amt.</th>
                    <th style={{ padding: '8px 10px', fontWeight: 'bold', textAlign: 'right' }}>Payable Amt.</th>
                    <th style={{ padding: '8px 10px', fontWeight: 'bold', textAlign: 'right' }}>Amt. Being Paid</th>
                    <th style={{ padding: '8px 10px', fontWeight: 'bold' }}>Fees Type</th>
                    <th style={{ padding: '8px 10px', fontWeight: 'bold' }}>Pay Schedule</th>
                  </tr>
                </thead>
                <tbody>
                  {feeHeads.length > 0 ? (
                    feeHeads.map((h, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 10px', fontWeight: 600, color: '#1e293b' }}>{h.head}</td>
                        <td style={{ padding: '8px 10px', textAlign: 'right', color: '#334155' }}>{Number(h.actualAmt).toFixed(2)}</td>
                        <td style={{ padding: '8px 10px', textAlign: 'right', color: '#334155' }}>{Number(h.concAmt).toFixed(2)}</td>
                        <td style={{ padding: '8px 10px', textAlign: 'right', color: '#334155' }}>{Number(h.lastRecAmt).toFixed(2)}</td>
                        <td style={{ padding: '8px 10px', textAlign: 'right', color: '#334155', fontWeight: 600 }}>{Number(h.payableAmt).toFixed(2)}</td>
                        <td style={{ padding: '4px 10px', textAlign: 'right' }}>
                          <input 
                            type="number"
                            value={h.amtBeingPaid}
                            onChange={(e) => handleHeadAmtChange(idx, e.target.value)}
                            style={{ width: '90px', padding: '4px 6px', border: '1px solid #cbd5e1', borderRadius: '3px', textAlign: 'right', fontSize: '12px', outline: 'none' }}
                          />
                        </td>
                        <td style={{ padding: '8px 10px', color: '#334155' }}>{h.feesType}</td>
                        <td style={{ padding: '8px 10px', color: '#334155' }}>{h.paySchedule}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                        Search and select a student to load fee structure breakdown
                      </td>
                    </tr>
                  )}
                  {feeHeads.length > 0 && (
                    <tr style={{ background: '#f8fafc', fontWeight: 'bold', borderTop: '2px solid #e2e8f0' }}>
                      <td style={{ padding: '8px 10px' }}>Total</td>
                      <td style={{ padding: '8px 10px', textAlign: 'right' }}>
                        {feeHeads.reduce((a, b) => a + Number(b.actualAmt), 0).toFixed(2)}
                      </td>
                      <td style={{ padding: '8px 10px', textAlign: 'right' }}>
                        {feeHeads.reduce((a, b) => a + Number(b.concAmt), 0).toFixed(2)}
                      </td>
                      <td style={{ padding: '8px 10px', textAlign: 'right' }}>
                        {feeHeads.reduce((a, b) => a + Number(b.lastRecAmt), 0).toFixed(2)}
                      </td>
                      <td style={{ padding: '8px 10px', textAlign: 'right' }}>
                        {feeHeads.reduce((a, b) => a + Number(b.payableAmt), 0).toFixed(2)}
                      </td>
                      <td style={{ padding: '8px 10px', textAlign: 'right', color: '#0f172a' }}>
                        {feeHeads.reduce((a, b) => a + Number(b.amtBeingPaid), 0).toFixed(2)}
                      </td>
                      <td colSpan={2}></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* 8. Bottom Totals Summary & Save/Reset Actions (Pics 1, 2, 4, 5) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '15px', alignItems: 'flex-end', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>Total Amt. Being Paid</label>
                <input 
                  type="text" 
                  value={totalAmtBeingPaid}
                  onChange={(e) => setTotalAmtBeingPaid(e.target.value)}
                  style={{ width: '100%', padding: '7px 10px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', color: '#0f172a', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>Dues Amt.:</label>
                <input 
                  type="text" 
                  readOnly 
                  value={duesAmt}
                  style={{ width: '100%', padding: '7px 10px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '13px', background: '#f8fafc', color: '#334155', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>Advance Amt.</label>
                <input 
                  type="text" 
                  readOnly 
                  value={advanceAmt}
                  style={{ width: '100%', padding: '7px 10px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '13px', background: '#f8fafc', color: '#334155', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={handleSave} 
                  disabled={loading}
                  style={{ background: '#4ade80', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                >
                  <Save size={15} /> {loading ? 'Saving...' : 'Save'}
                </button>
                <button 
                  onClick={handleReset} 
                  style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                >
                  <RotateCcw size={15} /> Reset
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ================= HISTORY MODAL ================= */}
      {historyModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '8px', maxWidth: '750px', width: '100%', padding: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#1e293b', fontWeight: 'bold' }}>Fee Transaction History</h3>
              <button onClick={() => setHistoryModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748b' }}>✕</button>
            </div>
            
            <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Receipt No</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Date</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Pay Mode</th>
                    <th style={{ padding: '8px', textAlign: 'right' }}>Amount Paid</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {historyReceipts.length > 0 ? (
                    historyReceipts.map((r, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px', fontWeight: 'bold', color: '#0284c7' }}>{r.receiptNo}</td>
                        <td style={{ padding: '8px' }}>{formatDateStr(r.receiptDate || r.createdAt)}</td>
                        <td style={{ padding: '8px' }}>{r.paymentMode}</td>
                        <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>₹{Number(r.amountPaid).toFixed(2)}</td>
                        <td style={{ padding: '8px', color: '#64748b' }}>{r.remarks || '-'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>No prior transactions found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div style={{ textAlign: 'right', marginTop: '16px' }}>
              <button 
                onClick={() => setHistoryModal(false)}
                style={{ background: '#64748b', color: '#fff', border: 'none', padding: '6px 18px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
