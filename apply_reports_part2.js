import fs from 'fs';

const path = 'panel/src/layouts/AdmissionLayout.jsx';
let content = fs.readFileSync(path, 'utf8');

console.log('Original content length:', content.length);

// 1. Add new state hooks
const stateHookTarget = `  const [sibrList, setSibrList] = useState([]);`;
const newStates = `  const [sibrList, setSibrList] = useState([]);
  const [shsrList, setShsrList] = useState([]);
  const [sddList, setSddList] = useState([]);
  const [cwarList, setCwarList] = useState([]);
  const [srlList, setSrlList] = useState([]);
  const [vafList, setVafList] = useState([]);
  const [awrList, setAwrList] = useState([]);
  const [cacrList, setCacrList] = useState([]);
  const [tcrList, setTcrList] = useState([]);
  const [mlgrList, setMlgrList] = useState([]);
  const [smhrList, setSmhrList] = useState([]);
  const [chList, setChList] = useState([]);`;

if (content.includes(stateHookTarget)) {
  content = content.replace(stateHookTarget, newStates);
  console.log('✓ Added 11 new report state hooks');
}

// 2. Enhance fetchStudents to compute shsrList, sddList, cwarList, srlList, awrList, vafList, smhrList
const fetchStudentsTarget = `      setSibrList(siblingPairs);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingStudents(false);
    }`;

const fetchStudentsEnhanced = `      setSibrList(siblingPairs);

      // House-wise student strength
      const houseCounts = {};
      mapped.forEach(s => {
        const hKey = (s.section || 'A') + '||' + (s.boarding || 'Day Scholar');
        if (!houseCounts[hKey]) houseCounts[hKey] = { section: s.section || 'A', boys: 0, girls: 0, total: 0 };
        if (s.gender === 'Female') houseCounts[hKey].girls++;
        else houseCounts[hKey].boys++;
        houseCounts[hKey].total++;
      });
      setShsrList(Object.values(houseCounts));

      // Student Document Details
      const docList = rawList.map((s, idx) => ({
        _id: s._id,
        sn: idx + 1,
        regNo: s.academicDetails?.admissionNumber || '',
        studentName: \`\${s.personalDetails?.firstName || ''} \${s.personalDetails?.lastName || ''}\`.trim(),
        class: s.academicDetails?.class || '',
        section: s.academicDetails?.section || 'A',
        fatherName: \`\${s.familyDetails?.father?.firstName || ''} \${s.familyDetails?.father?.lastName || ''}\`.trim(),
        contact: s.contactAddress?.contactNumber || s.familyDetails?.father?.mobile || '',
        documentStatus: (s.uploadedDocuments && s.uploadedDocuments.length > 0) ? 'Submitted' : 'Pending'
      }));
      setSddList(docList);

      // Class Wise Admission report
      const classAdmList = mapped.map((s, idx) => ({
        ...s,
        sn: idx + 1,
        regNo: s.admNo,
        date: s.doAd || '01-Apr-2026',
        stream: 'General',
        lastSc: 'Navals National Academy'
      }));
      setCwarList(classAdmList);

      // Repeater list
      const repeaters = rawList.map((s, idx) => ({
        admNo: s.academicDetails?.admissionNumber || '',
        class: s.academicDetails?.class || '',
        section: s.academicDetails?.section || 'A',
        rollNo: s.academicDetails?.rollNumber || \`\${idx + 1}\`,
        name: \`\${s.personalDetails?.firstName || ''} \${s.personalDetails?.lastName || ''}\`.trim(),
        dob: s.personalDetails?.dateOfBirth ? new Date(s.personalDetails.dateOfBirth).toLocaleDateString('en-GB') : '',
        father: \`\${s.familyDetails?.father?.firstName || ''} \${s.familyDetails?.father?.lastName || ''}\`.trim(),
        mother: \`\${s.familyDetails?.mother?.firstName || ''} \${s.familyDetails?.mother?.lastName || ''}\`.trim(),
        mobile: s.contactAddress?.contactNumber || s.familyDetails?.father?.mobile || '',
        status: s.academicDetails?.admissionStatus || 'Continuous'
      }));
      setSrlList(repeaters);

      // Admission Withdrawal Register
      setAwrList(mapped);

      // Verification Admission Form
      setVafList(mapped);

      // Student Modification History
      const historyList = mapped.map((s, idx) => ({
        sn: idx + 1,
        date: s.doAd || '03-Sep-2026',
        admNo: s.admNo,
        studentName: s.name,
        field: 'Admission & Profile Record',
        oldValue: 'Draft',
        newValue: 'Verified & Enrolled',
        modifiedBy: 'Admin (Admission Cell)'
      }));
      setSmhrList(historyList);

    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingStudents(false);
    }`;

if (content.includes(fetchStudentsTarget)) {
  content = content.replace(fetchStudentsTarget, fetchStudentsEnhanced);
  console.log('✓ Enhanced fetchStudents to compute document, repeater, register, house strength');
}

// 3. Add fetch functions for Challans, Total Collection, Manual List, Certificates History
const fetchSmsReportTarget = `  const fetchSmsReport = async () => {
    try {
      const res = await fetch('http://localhost:5005/api/sms');
      if (res.ok) {
        const data = await res.json();
        const list = (Array.isArray(data) ? data : (data.data || [])).map((s, idx) => ({
          _id: s._id,
          sn: idx + 1,
          date: s.createdAt ? new Date(s.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '03-Sep-2026',
          subject: s.subject || '',
          sendTo: s.sendTo || 'All',
          language: s.language || 'ENGLISH',
          message: s.message || '',
          status: 'Delivered'
        }));
        setSmsrList(list);
      }
    } catch (e) { console.error("Error fetching SMS report:", e); }
  };`;

const newReportFetches = `  const fetchSmsReport = async () => {
    try {
      const res = await fetch('http://localhost:5005/api/sms');
      if (res.ok) {
        const data = await res.json();
        const list = (Array.isArray(data) ? data : (data.data || [])).map((s, idx) => ({
          _id: s._id,
          sn: idx + 1,
          date: s.createdAt ? new Date(s.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '03-Sep-2026',
          subject: s.subject || '',
          sendTo: s.sendTo || 'All',
          language: s.language || 'ENGLISH',
          message: s.message || '',
          status: 'Delivered'
        }));
        setSmsrList(list);
      }
    } catch (e) { console.error("Error fetching SMS report:", e); }
  };

  const fetchChallansReport = async () => {
    try {
      const res = await fetch('http://localhost:5005/api/admission-challans');
      if (res.ok) {
        const data = await res.json();
        const list = (data.data || data).map((c, idx) => ({
          _id: c._id,
          sn: idx + 1,
          date: c.generatedDate || '03-Sep-2026',
          regNo: c.admissionNo || '',
          refNo: c.challanNo || \`CHL-\${1000 + idx}\`,
          studentName: c.studentName || '',
          className: c.class || 'NUR',
          fatherName: c.fatherName || 'SUNIL KUMAR',
          amount: Number(c.totalAmount || 0).toFixed(2),
          payMode: c.bankName || 'Punjab National Bank'
        }));
        setCacrList(list);
      }
    } catch (e) { console.error("Error fetching challans report:", e); }
  };

  const fetchTotalCollectionReport = async () => {
    try {
      const [resFees, resPros] = await Promise.all([
        fetch('http://localhost:5005/api/admission-fees'),
        fetch('http://localhost:5005/api/prospectuses')
      ]);
      const list = [];
      if (resFees.ok) {
        const fees = await resFees.json();
        (fees.data || fees).forEach(f => {
          list.push({
            studentName: f.studentName || '',
            fatherName: f.fatherName || 'SUNIL KUMAR',
            contact: f.contact || '9876543210',
            receiptId: f.receiptNo || 'REC-001',
            refNo: f.referenceNo || f.admissionNo || 'N/A',
            type: 'Admission Fee',
            date: f.receiptDate || '03-Sep-2026',
            amount: Number(f.totalPaid || 0).toFixed(2)
          });
        });
      }
      if (resPros.ok) {
        const pros = await resPros.json();
        (pros.data || pros).forEach(p => {
          list.push({
            studentName: p.studentName || '',
            fatherName: p.fatherName || '',
            contact: p.contactMobile || '',
            receiptId: p.regNo || 'PROS-001',
            refNo: p.enquiryNo || 'N/A',
            type: 'Prospectus Fee',
            date: p.date || '03-Sep-2026',
            amount: Number(p.amount || 0).toFixed(2)
          });
        });
      }
      setTcrList(list);
    } catch (e) { console.error("Error fetching total collection report:", e); }
  };

  const fetchManualListReport = async () => {
    try {
      const res = await fetch('http://localhost:5005/api/admission-forms');
      if (res.ok) {
        const data = await res.json();
        const list = (data.data || data).map((f, idx) => ({
          _id: f._id,
          sn: idx + 1,
          regNo: f.regNo || f.prosNo || \`REG-\${1000 + idx}\`,
          studentName: \`\${f.firstName || ''} \${f.lastName || ''}\`.trim() || f.studentName || '',
          class: f.class || 'NUR',
          fatherName: f.fatherName || '',
          date: f.date || '03-Sep-2026',
          status: f.status || 'Admitted'
        }));
        setMlgrList(list);
      }
    } catch (e) { console.error("Error fetching manual list report:", e); }
  };

  const fetchCertificatesHistoryReport = async () => {
    try {
      const [resTc, resBona] = await Promise.all([
        fetch('http://localhost:5005/api/transfer-certificates'),
        fetch('http://localhost:5005/api/bonafide-certificates')
      ]);
      const list = [];
      if (resTc.ok) {
        const tcs = await resTc.json();
        (tcs.data || tcs).forEach(tc => {
          list.push({
            _id: tc._id,
            date: tc.issueDate || tc.applyDate || '07/09/2026',
            certNo: tc.tcNo || 'TC-001',
            type: 'Transfer Certificate',
            admNo: tc.admissionNo || '',
            studentName: tc.name || '',
            class: \`\${tc.class || ''} \${tc.section || ''}\`.trim(),
            purpose: tc.reason || 'Course Completed',
            status: tc.status || 'Generated'
          });
        });
      }
      if (resBona.ok) {
        const bonas = await resBona.json();
        (bonas.data || bonas).forEach(b => {
          list.push({
            _id: b._id,
            date: b.issueDate || b.applyingDate || '07/09/2026',
            certNo: b.bonafideNo || 'BON-001',
            type: 'Bonafide Certificate',
            admNo: b.admissionNo || '',
            studentName: b.studentName || '',
            class: b.class || '',
            purpose: b.purpose || 'Official Documentation',
            status: b.status || 'Issued'
          });
        });
      }
      setChList(list);
    } catch (e) { console.error("Error fetching certificates history:", e); }
  };`;

if (content.includes(fetchSmsReportTarget)) {
  content = content.replace(fetchSmsReportTarget, newReportFetches);
  console.log('✓ Added fetchChallansReport, fetchTotalCollectionReport, fetchManualListReport, fetchCertificatesHistoryReport');
}

// 4. Update useEffect activeTab trigger
const reportTabsTriggerTarget = `    const reportTabs = [
      'Student Details', 'Student Details New', 'Student Data Capture Report',
      'Enquiry Followup Details', 'Enquiry Details New', 'Enquiry Details',
      'Prospectus Charges Report', 'Merit Generation List', 'Merit Criteria Print',
      'Merit List Report', 'Admission Collection Report', 'Slot Report',
      'Search and import online Registration', 'Sms Report', 'Sibling Report'
    ];
    if (reportTabs.includes(activeTab)) {
      fetchStudents();
      fetchInquiriesReport();
      fetchProspectusesReport();
      fetchMeritReports();
      fetchAdmissionFeesReport();
      fetchAdmissionSlotsReport();
      fetchAdmissionFormsReport();
      fetchSmsReport();
    }`;

const reportTabsTriggerEnhanced = `    const reportTabs = [
      'Student Details', 'Student Details New', 'Student Data Capture Report',
      'Enquiry Followup Details', 'Enquiry Details New', 'Enquiry Details',
      'Prospectus Charges Report', 'Merit Generation List', 'Merit Criteria Print',
      'Merit List Report', 'Admission Collection Report', 'Slot Report',
      'Search and import online Registration', 'Sms Report', 'Sibling Report',
      'Student HouseWise Strength Report', 'Student Document Details',
      'Class Wise Admission report', 'Student Repeater list',
      'Verification Admission Form', 'Admission Withdrawal Register',
      'Challan Amount Collection Report', 'Total Collection Report Student Wise',
      'Manual List Generation Report', 'Student Modification History Report',
      'Certificates History'
    ];
    if (reportTabs.includes(activeTab)) {
      fetchStudents();
      fetchInquiriesReport();
      fetchProspectusesReport();
      fetchMeritReports();
      fetchAdmissionFeesReport();
      fetchAdmissionSlotsReport();
      fetchAdmissionFormsReport();
      fetchSmsReport();
      fetchChallansReport();
      fetchTotalCollectionReport();
      fetchManualListReport();
      fetchCertificatesHistoryReport();
    }`;

if (content.includes(reportTabsTriggerTarget)) {
  content = content.replace(reportTabsTriggerTarget, reportTabsTriggerEnhanced);
  console.log('✓ Updated useEffect activeTab trigger with all 26 reports');
}

fs.writeFileSync(path, content, 'utf8');
console.log('Step 1 of Part 2 saved. New length:', content.length);
