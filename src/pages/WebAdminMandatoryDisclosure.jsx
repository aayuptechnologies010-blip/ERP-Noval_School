import React, { useState, useEffect } from 'react';
import { 
  FaInfoCircle, FaFilePdf, FaGraduationCap, FaUserTie, FaEye, FaTrash, FaPlus, FaBuilding, FaYoutube, FaFolder
} from 'react-icons/fa';


const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function WebAdminMandatoryDisclosure() {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Section A
  const [generalInfo, setGeneralInfo] = useState({
    schoolName: '',
    affiliationNo: '',
    schoolCode: '',
    address: '',
    email: '',
    landline: '',
    mobile: ''
  });

  // Section B Documents
  const sectionBTitles = [
    "Copies of Affiliation/Upgradation Letter and Recent Extension of Affiliation",
    "Copies of Societies/Trust/Company Registration/Renewal Certificate",
    "Copy of No Objection Certificate (NOC) Issued, If Applicable, By The State Govt./UT",
    "Copies of Recognition Certificate Under RTE Act, 2009, And It's Renewal If Applicable",
    "Copy of Valid Building Safety Certificate As Per The National Building Code",
    "Copy of Valid Fire Safety Certificate Issued By The Competent Authority",
    "Copy of The DEO Certificate Submitted By The School For Affiliation/Upgradation/Extension",
    "Copies of Valid Water, Health and Sanitation Certificates",
    "OASIS - SARAS 6.0 - Mandatory Public Disclosure",
    "POCSO Certificate",
    "Anti Taboca",
    "Self Certification by School",
    "Copy of Valid Land Certificate"
  ];
  const [docsB, setDocsB] = useState(sectionBTitles.map(title => ({ title, url: '', attachment: '', fileName: '' })));

  // Section C Documents
  const sectionCTitles = [
    "Fee Structure of the School",
    "Annual Academic Calendar",
    "List of School Management Committee (SMC)",
    "List of Parents Teachers Association (PTA) Members",
    "Last 3-Year Result of the Board Examination as per Applicability",
    "Central Board of Secondary Education School Performance Report Card",
    "Book List",
    "Disciplinary Committee"
  ];
  const [docsC, setDocsC] = useState(sectionCTitles.map(title => ({ title, url: '', attachment: '', fileName: '' })));

  // Result Class X & XII
  const [resultsX, setResultsX] = useState([
    { year: '', registered: '', passed: '', percentage: '', remarks: '' }
  ]);
  const [resultsXII, setResultsXII] = useState([
    { year: '', registered: '', passed: '', percentage: '', remarks: '' }
  ]);

  // Section D Staff
  const [staffInfo, setStaffInfo] = useState({
    principalName: '', principalQual: '',
    vicePrincipalName: '', vicePrincipalQual: '',
    hmName: '', hmQual: '',
    totalTeachers: '', pgt: '', tgt: '', prt: '', pet: '', ntt: '', pti: '',
    officeStaff: '', ratio: ''
  });

  const [specialEducators, setSpecialEducators] = useState([{ empId: '', name: '', qual: '' }]);
  const [counsellors, setCounsellors] = useState([{ empId: '', name: '', qual: '' }]);
  const [wellnessTeachers, setWellnessTeachers] = useState([{ empId: '', name: '', qual: '' }]);

  // Section E Infrastructure
  const [infra, setInfra] = useState({
    campusArea: '',
    classrooms: '',
    labs: '',
    compLabs: '',
    library: '',
    internet: 'Yes',
    girlsToilets: '',
    boysToilets: '',
    cwsnToilets: '',
    youtubeVideo: '',
    docUrl: '',
    docAttachment: '',
    docFileName: ''
  });

  // Section F Documents
  const sectionFTitles = [
    "DETAILS OF CURRICULUM",
    "ANNUAL REPORT",
    "TRANSFER CERTIFICATE SAMPLE",
    "SCHOOL CIRCULARS",
    "SELF AFFIDAVIT OF SCHOOL",
    "NORMS FOLLOWED FOR FIXING FEE",
    "DECLARATION OF BOOKS PRESCRIBED BY THE SCHOOL",
    "ACADEMIC ACHIEVEMENTS",
    "THE NUMBER OF STUDENT CLASS WISE"
  ];
  const [docsF, setDocsF] = useState(sectionFTitles.map(title => ({ title, url: '', attachment: '', fileName: '' })));

  useEffect(() => {
    fetchDisclosure();
  }, []);

  const fetchDisclosure = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/mandatory-disclosure`);
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        const record = data.data[0];
        if (record.generalInfo) setGeneralInfo(record.generalInfo);
        if (record.documents?.docsB) setDocsB(record.documents.docsB);
        if (record.documents?.docsC) setDocsC(record.documents.docsC);
        if (record.resultsClassX && record.resultsClassX.length > 0) setResultsX(record.resultsClassX);
        if (record.resultsClassXII && record.resultsClassXII.length > 0) setResultsXII(record.resultsClassXII);
        if (record.staffDetails) setStaffInfo(record.staffDetails);
        if (record.specialEducators && record.specialEducators.length > 0) setSpecialEducators(record.specialEducators);
        if (record.counsellors && record.counsellors.length > 0) setCounsellors(record.counsellors);
        if (record.wellnessTeachers && record.wellnessTeachers.length > 0) setWellnessTeachers(record.wellnessTeachers);
        if (record.infrastructure) setInfra(record.infrastructure);
        if (record.documents?.docsF) setDocsF(record.documents.docsF);
      }
    } catch (err) {
      console.error('Error fetching disclosure:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (file, callback) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result, file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleDocChange = (list, setList, index, field, value) => {
    const updated = [...list];
    updated[index] = { ...updated[index], [field]: value };
    setList(updated);
  };

  const handleSave = async () => {
    setSubmitting(true);
    setError('');
    setSuccess('');

    const payload = {
      generalInfo,
      documents: {
        docsB,
        docsC,
        docsF
      },
      resultsClassX: resultsX,
      resultsClassXII: resultsXII,
      staffDetails: staffInfo,
      specialEducators,
      counsellors,
      wellnessTeachers,
      infrastructure: infra
    };

    try {
      const res = await fetch(`${API_BASE}/api/web-admin/mandatory-disclosure`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Mandatory Disclosure saved successfully!');
        setTimeout(() => setSuccess(''), 4000);
      } else {
        setError(data.message || 'Failed to save disclosure');
      }
    } catch (err) {
      setError('An error occurred while saving.');
    } finally {
      setSubmitting(false);
    }
  };

  const DocumentRow = ({ index, item, onChange }) => (
    <div className="flex border-b border-gray-200 hover:bg-gray-50/50 transition items-start py-4">
      <div className="w-16 text-center text-xs font-medium text-gray-700 pt-2">{index}</div>
      <div className="flex-1 px-4 text-xs font-medium text-gray-700 pt-2 pr-8">{item.title}</div>
      <div className="w-[450px] px-4">
        <div className="flex flex-col gap-2">
          <input 
            type="text" 
            placeholder="Paste URL link here..." 
            value={item.url || ''}
            onChange={(e) => onChange('url', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500 bg-white" 
          />
          <div className="flex items-center gap-2">
            {item.attachment || item.url ? (
              <a 
                href={item.attachment || item.url} 
                target="_blank" 
                rel="noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded"
                title="Preview"
              >
                <FaEye className="text-xs" />
              </a>
            ) : null}
            {(item.attachment || item.url) && (
              <button 
                onClick={() => { onChange('attachment', ''); onChange('fileName', ''); onChange('url', ''); }}
                className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded"
                title="Clear"
              >
                <FaTrash className="text-xs" />
              </button>
            )}
            <label className="flex items-center border border-gray-300 rounded overflow-hidden flex-1 bg-white cursor-pointer">
              <span className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 border-r border-gray-300 whitespace-nowrap">Choose File</span>
              <span className="px-3 text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                {item.fileName || (item.attachment ? "File attached" : "No file chosen")}
              </span>
              <input 
                type="file" 
                className="hidden" 
                accept=".pdf,.doc,.docx,image/*" 
                onChange={(e) => {
                  if (e.target.files[0]) {
                    handleFileUpload(e.target.files[0], (base64, name) => {
                      onChange('attachment', base64);
                      onChange('fileName', name);
                    });
                  }
                }} 
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7] relative pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Mandatory Public Disclosure</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> CBSE Compliance <span className="mx-1">&gt;</span> Manage Disclosure
        </div>
      </div>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-6">
        
        {/* Section A */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#f8f9fb] px-5 py-4 flex items-center gap-2 border-b border-gray-200">
            <FaInfoCircle className="text-blue-600 text-sm" />
            <h2 className="text-sm font-bold text-gray-800">A. General Information</h2>
          </div>
          
          <div className="p-6 flex flex-col gap-5">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Name of the School <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={generalInfo.schoolName}
                onChange={(e) => setGeneralInfo({ ...generalInfo, schoolName: e.target.value })}
                placeholder="Enter School Name"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Affiliation No. (If Applicable)</label>
                <input 
                  type="text" 
                  value={generalInfo.affiliationNo}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, affiliationNo: e.target.value })}
                  placeholder="Enter Affiliation No."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">School Code (If Applicable)</label>
                <input 
                  type="text" 
                  value={generalInfo.schoolCode}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, schoolCode: e.target.value })}
                  placeholder="Enter School Code"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Complete Address with Pin Code <span className="text-red-500">*</span></label>
              <textarea 
                rows="3" 
                value={generalInfo.address}
                onChange={(e) => setGeneralInfo({ ...generalInfo, address: e.target.value })}
                placeholder="Enter Complete Address"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 resize-y"
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">School Email ID <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={generalInfo.email}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, email: e.target.value })}
                  placeholder="Enter School Email"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Contact Details (Landline/Mobile) <span className="text-red-500">*</span></label>
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    placeholder="Landline" 
                    value={generalInfo.landline}
                    onChange={(e) => setGeneralInfo({ ...generalInfo, landline: e.target.value })}
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                  />
                  <input 
                    type="text" 
                    placeholder="Mobile *" 
                    value={generalInfo.mobile}
                    onChange={(e) => setGeneralInfo({ ...generalInfo, mobile: e.target.value })}
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section B */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#f8f9fb] px-5 py-4 flex items-center justify-between border-b border-gray-200">
            <div className="flex items-center gap-2">
              <FaFilePdf className="text-red-500 text-sm" />
              <h2 className="text-sm font-bold text-gray-800">B. Documents and Information</h2>
            </div>
            <div className="text-[10px] text-gray-500 font-medium uppercase">
              Provide Web URL or Upload Max 10MB PDF
            </div>
          </div>
          
          <div className="flex bg-gray-50/80 border-b border-gray-200 py-3">
            <div className="w-16 text-center text-[10px] font-bold text-gray-600 uppercase">S.NO</div>
            <div className="flex-1 px-4 text-[10px] font-bold text-gray-600 uppercase">DOCUMENTS / INFORMATION</div>
            <div className="w-[450px] px-4 text-[10px] font-bold text-gray-600 uppercase">WEB URL / UPLOAD DOCUMENT</div>
          </div>

          <div className="flex flex-col">
            {docsB.map((item, idx) => (
              <DocumentRow 
                key={`b-${idx}`} 
                index={idx + 1} 
                item={item} 
                onChange={(f, v) => handleDocChange(docsB, setDocsB, idx, f, v)} 
              />
            ))}
          </div>
        </div>

        {/* Section C */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#f8f9fb] px-5 py-4 flex items-center justify-between border-b border-gray-200">
            <div className="flex items-center gap-2">
              <FaGraduationCap className="text-green-600 text-sm" />
              <h2 className="text-sm font-bold text-gray-800">C. Result and Academics</h2>
            </div>
            <div className="text-[10px] text-gray-500 font-medium uppercase">
              Provide Web URL or Upload Max 10MB PDF
            </div>
          </div>
          
          <div className="flex bg-gray-50/80 border-b border-gray-200 py-3">
            <div className="w-16 text-center text-[10px] font-bold text-gray-600 uppercase">S.NO</div>
            <div className="flex-1 px-4 text-[10px] font-bold text-gray-600 uppercase">DOCUMENTS / INFORMATION</div>
            <div className="w-[450px] px-4 text-[10px] font-bold text-gray-600 uppercase">WEB URL / UPLOAD DOCUMENT</div>
          </div>

          <div className="flex flex-col">
            {docsC.map((item, idx) => (
              <DocumentRow 
                key={`c-${idx}`} 
                index={idx + 1} 
                item={item} 
                onChange={(f, v) => handleDocChange(docsC, setDocsC, idx, f, v)} 
              />
            ))}
          </div>
          
          {/* Result Sub-tables */}
          <div className="p-6 flex flex-col gap-8 bg-white border-t border-gray-200">
            
            {/* Class X Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider">RESULT CLASS: X</h3>
                <button 
                  onClick={() => setResultsX([...resultsX, { year: '', registered: '', passed: '', percentage: '', remarks: '' }])}
                  className="flex items-center gap-1.5 text-blue-600 text-xs font-bold hover:text-blue-700 transition"
                >
                  <FaPlus className="text-[10px]" /> Add Row
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50 border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-3 text-center text-[10px] font-bold text-gray-600 uppercase w-12">S.NO</th>
                      <th className="px-3 py-3 text-center text-[10px] font-bold text-gray-600 uppercase">YEAR</th>
                      <th className="px-3 py-3 text-center text-[10px] font-bold text-gray-600 uppercase">NO. OF REGISTERED STUDENTS</th>
                      <th className="px-3 py-3 text-center text-[10px] font-bold text-gray-600 uppercase">NO. OF STUDENTS PASSED</th>
                      <th className="px-3 py-3 text-center text-[10px] font-bold text-gray-600 uppercase">PASS PERCENTAGE</th>
                      <th className="px-3 py-3 text-center text-[10px] font-bold text-gray-600 uppercase">REMARKS</th>
                      <th className="px-3 py-3 text-center text-[10px] font-bold text-gray-600 uppercase w-16">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultsX.map((row, idx) => (
                      <tr key={`rx-${idx}`} className="border-b border-gray-100">
                        <td className="px-3 py-3 text-center text-xs font-medium text-gray-700">{idx + 1}</td>
                        <td className="px-3 py-3">
                          <input 
                            type="text" 
                            placeholder="e.g. 2022-2023" 
                            value={row.year}
                            onChange={(e) => {
                              const up = [...resultsX];
                              up[idx].year = e.target.value;
                              setResultsX(up);
                            }}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" 
                          />
                        </td>
                        <td className="px-3 py-3">
                          <input 
                            type="text" 
                            value={row.registered}
                            onChange={(e) => {
                              const up = [...resultsX];
                              up[idx].registered = e.target.value;
                              setResultsX(up);
                            }}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" 
                          />
                        </td>
                        <td className="px-3 py-3">
                          <input 
                            type="text" 
                            value={row.passed}
                            onChange={(e) => {
                              const up = [...resultsX];
                              up[idx].passed = e.target.value;
                              setResultsX(up);
                            }}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" 
                          />
                        </td>
                        <td className="px-3 py-3">
                          <input 
                            type="text" 
                            placeholder="%" 
                            value={row.percentage}
                            onChange={(e) => {
                              const up = [...resultsX];
                              up[idx].percentage = e.target.value;
                              setResultsX(up);
                            }}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" 
                          />
                        </td>
                        <td className="px-3 py-3">
                          <input 
                            type="text" 
                            value={row.remarks}
                            onChange={(e) => {
                              const up = [...resultsX];
                              up[idx].remarks = e.target.value;
                              setResultsX(up);
                            }}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" 
                          />
                        </td>
                        <td className="px-3 py-3 text-center">
                          <button 
                            onClick={() => {
                              if (resultsX.length > 1) {
                                setResultsX(resultsX.filter((_, i) => i !== idx));
                              }
                            }}
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            <FaTrash className="text-xs mx-auto" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Class XII Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider">RESULT CLASS: XII</h3>
                <button 
                  onClick={() => setResultsXII([...resultsXII, { year: '', registered: '', passed: '', percentage: '', remarks: '' }])}
                  className="flex items-center gap-1.5 text-blue-600 text-xs font-bold hover:text-blue-700 transition"
                >
                  <FaPlus className="text-[10px]" /> Add Row
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50 border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-3 text-center text-[10px] font-bold text-gray-600 uppercase w-12">S.NO</th>
                      <th className="px-3 py-3 text-center text-[10px] font-bold text-gray-600 uppercase">YEAR</th>
                      <th className="px-3 py-3 text-center text-[10px] font-bold text-gray-600 uppercase">NO. OF REGISTERED STUDENTS</th>
                      <th className="px-3 py-3 text-center text-[10px] font-bold text-gray-600 uppercase">NO. OF STUDENTS PASSED</th>
                      <th className="px-3 py-3 text-center text-[10px] font-bold text-gray-600 uppercase">PASS PERCENTAGE</th>
                      <th className="px-3 py-3 text-center text-[10px] font-bold text-gray-600 uppercase">REMARKS</th>
                      <th className="px-3 py-3 text-center text-[10px] font-bold text-gray-600 uppercase w-16">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultsXII.map((row, idx) => (
                      <tr key={`rxii-${idx}`} className="border-b border-gray-100">
                        <td className="px-3 py-3 text-center text-xs font-medium text-gray-700">{idx + 1}</td>
                        <td className="px-3 py-3">
                          <input 
                            type="text" 
                            placeholder="e.g. 2022-2023" 
                            value={row.year}
                            onChange={(e) => {
                              const up = [...resultsXII];
                              up[idx].year = e.target.value;
                              setResultsXII(up);
                            }}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" 
                          />
                        </td>
                        <td className="px-3 py-3">
                          <input 
                            type="text" 
                            value={row.registered}
                            onChange={(e) => {
                              const up = [...resultsXII];
                              up[idx].registered = e.target.value;
                              setResultsXII(up);
                            }}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" 
                          />
                        </td>
                        <td className="px-3 py-3">
                          <input 
                            type="text" 
                            value={row.passed}
                            onChange={(e) => {
                              const up = [...resultsXII];
                              up[idx].passed = e.target.value;
                              setResultsXII(up);
                            }}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" 
                          />
                        </td>
                        <td className="px-3 py-3">
                          <input 
                            type="text" 
                            placeholder="%" 
                            value={row.percentage}
                            onChange={(e) => {
                              const up = [...resultsXII];
                              up[idx].percentage = e.target.value;
                              setResultsXII(up);
                            }}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" 
                          />
                        </td>
                        <td className="px-3 py-3">
                          <input 
                            type="text" 
                            value={row.remarks}
                            onChange={(e) => {
                              const up = [...resultsXII];
                              up[idx].remarks = e.target.value;
                              setResultsXII(up);
                            }}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" 
                          />
                        </td>
                        <td className="px-3 py-3 text-center">
                          <button 
                            onClick={() => {
                              if (resultsXII.length > 1) {
                                setResultsXII(resultsXII.filter((_, i) => i !== idx));
                              }
                            }}
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            <FaTrash className="text-xs mx-auto" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        {/* Section D */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#f8f9fb] px-5 py-4 flex items-center gap-2 border-b border-gray-200">
            <FaUserTie className="text-orange-500 text-sm" />
            <h2 className="text-sm font-bold text-gray-800">D. Staff (Teaching)</h2>
          </div>
          
          <div className="p-6 flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">PRINCIPAL</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Name" 
                    value={staffInfo.principalName}
                    onChange={(e) => setStaffInfo({ ...staffInfo, principalName: e.target.value })}
                    className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" 
                  />
                  <input 
                    type="text" 
                    placeholder="Qualification" 
                    value={staffInfo.principalQual}
                    onChange={(e) => setStaffInfo({ ...staffInfo, principalQual: e.target.value })}
                    className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">VICE PRINCIPAL</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Name" 
                    value={staffInfo.vicePrincipalName}
                    onChange={(e) => setStaffInfo({ ...staffInfo, vicePrincipalName: e.target.value })}
                    className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" 
                  />
                  <input 
                    type="text" 
                    placeholder="Qualification" 
                    value={staffInfo.vicePrincipalQual}
                    onChange={(e) => setStaffInfo({ ...staffInfo, vicePrincipalQual: e.target.value })}
                    className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">HEAD MASTER/HEAD MISTRESS</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Name" 
                    value={staffInfo.hmName}
                    onChange={(e) => setStaffInfo({ ...staffInfo, hmName: e.target.value })}
                    className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" 
                  />
                  <input 
                    type="text" 
                    placeholder="Qualification" 
                    value={staffInfo.hmQual}
                    onChange={(e) => setStaffInfo({ ...staffInfo, hmQual: e.target.value })}
                    className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">TEACHERS SECTION RATIO</label>
                <input 
                  type="text" 
                  placeholder="e.g. 1.5:1" 
                  value={staffInfo.ratio}
                  onChange={(e) => setStaffInfo({ ...staffInfo, ratio: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" 
                />
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-xs font-bold text-gray-700 mb-3 uppercase">Teacher Counts</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
                {[
                  { label: "Total", field: "totalTeachers" },
                  { label: "PGT", field: "pgt" },
                  { label: "TGT", field: "tgt" },
                  { label: "PRT", field: "prt" },
                  { label: "PET", field: "pet" },
                  { label: "NTT", field: "ntt" },
                  { label: "PTI", field: "pti" },
                  { label: "Office Staff", field: "officeStaff" },
                ].map((item) => (
                  <div key={item.field}>
                    <label className="block text-[10px] font-semibold text-gray-600 mb-1">{item.label}</label>
                    <input 
                      type="number" 
                      value={staffInfo[item.field]}
                      onChange={(e) => setStaffInfo({ ...staffInfo, [item.field]: e.target.value })}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-xs text-gray-600 outline-none focus:border-blue-500" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-8 bg-white border-t border-gray-200">
            {/* Subtable helper */}
            {[
              { title: "DETAILS OF SPECIAL EDUCATOR", list: specialEducators, setList: setSpecialEducators },
              { title: "DETAILS OF COUNSELLOR", list: counsellors, setList: setCounsellors },
              { title: "DETAILS OF COUNSELLOR & WELLNESS TEACHER", list: wellnessTeachers, setList: setWellnessTeachers },
            ].map((section, sIdx) => (
              <div key={sIdx}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider">{section.title}</h3>
                  <button 
                    onClick={() => section.setList([...section.list, { empId: '', name: '', qual: '' }])}
                    className="flex items-center gap-1.5 text-blue-600 text-xs font-bold hover:text-blue-700 transition"
                  >
                    <FaPlus className="text-[10px]" /> Add Row
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-200">
                      <tr>
                        <th className="px-3 py-3 text-center text-[10px] font-bold text-gray-600 uppercase w-12">S.NO</th>
                        <th className="px-3 py-3 text-left text-[10px] font-bold text-gray-600 uppercase w-64">EMPLOYEE ID (OPTIONAL)</th>
                        <th className="px-3 py-3 text-left text-[10px] font-bold text-gray-600 uppercase">NAME</th>
                        <th className="px-3 py-3 text-left text-[10px] font-bold text-gray-600 uppercase">QUALIFICATION</th>
                        <th className="px-3 py-3 text-center text-[10px] font-bold text-gray-600 uppercase w-16">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.list.map((row, idx) => (
                        <tr key={`sec-${sIdx}-${idx}`} className="border-b border-gray-100">
                          <td className="px-3 py-3 text-center text-xs font-medium text-gray-700">{idx + 1}</td>
                          <td className="px-3 py-3">
                            <input 
                              type="text" 
                              value={row.empId}
                              onChange={(e) => {
                                const up = [...section.list];
                                up[idx].empId = e.target.value;
                                section.setList(up);
                              }}
                              className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" 
                            />
                          </td>
                          <td className="px-3 py-3">
                            <input 
                              type="text" 
                              value={row.name}
                              onChange={(e) => {
                                const up = [...section.list];
                                up[idx].name = e.target.value;
                                section.setList(up);
                              }}
                              className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" 
                            />
                          </td>
                          <td className="px-3 py-3">
                            <input 
                              type="text" 
                              value={row.qual}
                              onChange={(e) => {
                                const up = [...section.list];
                                up[idx].qual = e.target.value;
                                section.setList(up);
                              }}
                              className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" 
                            />
                          </td>
                          <td className="px-3 py-3 text-center">
                            <button 
                              onClick={() => {
                                if (section.list.length > 1) {
                                  section.setList(section.list.filter((_, i) => i !== idx));
                                }
                              }}
                              className="text-red-500 hover:text-red-700 transition"
                            >
                              <FaTrash className="text-xs mx-auto" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section E */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#f8f9fb] px-5 py-4 flex items-center gap-2 border-b border-gray-200">
            <FaBuilding className="text-cyan-600 text-sm" />
            <h2 className="text-sm font-bold text-gray-800">E. School Infrastructure</h2>
          </div>
          
          <div className="p-6 flex flex-col gap-5 border-b border-gray-200">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Total Campus Area of the School (in Sq Mtr)</label>
              <input 
                type="number" 
                value={infra.campusArea}
                onChange={(e) => setInfra({ ...infra, campusArea: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">No. and Size of the Class Rooms (in Sq Mtr)</label>
              <input 
                type="text" 
                value={infra.classrooms}
                onChange={(e) => setInfra({ ...infra, classrooms: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">No. and Size of Laboratories including Computer Labs (in Sq Mtr)</label>
              <input 
                type="text" 
                value={infra.labs}
                onChange={(e) => setInfra({ ...infra, labs: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">No. and Size of Library (in Sq Mtr)</label>
              <input 
                type="text" 
                value={infra.library}
                onChange={(e) => setInfra({ ...infra, library: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Internet Facility</label>
                <select 
                  value={infra.internet}
                  onChange={(e) => setInfra({ ...infra, internet: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white"
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">No. of Girls Toilets</label>
                <input 
                  type="text" 
                  value={infra.girlsToilets}
                  onChange={(e) => setInfra({ ...infra, girlsToilets: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">No. of Boys Toilets</label>
                <input 
                  type="text" 
                  value={infra.boysToilets}
                  onChange={(e) => setInfra({ ...infra, boysToilets: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                />
              </div>
            </div>

            <div className="w-full md:w-1/3 pr-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">No. of CWSN Toilets</label>
              <input 
                type="text" 
                value={infra.cwsnToilets}
                onChange={(e) => setInfra({ ...infra, cwsnToilets: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Link of YouTube Video of Inspection</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={infra.youtubeVideo}
                  onChange={(e) => setInfra({ ...infra, youtubeVideo: e.target.value })}
                  placeholder="https://www.youtube.com/embed/..." 
                  className="w-full border border-gray-300 rounded px-3 py-2 pl-9 text-sm text-gray-600 outline-none focus:border-blue-500" 
                />
                <FaYoutube className="absolute left-3 top-2.5 text-red-500" />
              </div>
              <div className="text-[10px] text-red-500 font-bold mt-1 flex items-center gap-1">
                <FaInfoCircle /> Note: Please provide only the YouTube Embed link here.
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-sm font-bold text-blue-600 mb-4">Upload Infrastructure Documents</h3>
            <div className="flex bg-gray-50/80 border-b border-gray-200 py-3">
              <div className="w-16 text-center text-[10px] font-bold text-gray-600 uppercase">S.NO</div>
              <div className="flex-1 px-4 text-[10px] font-bold text-gray-600 uppercase">DOCUMENTS / INFORMATION</div>
              <div className="w-[450px] px-4 text-[10px] font-bold text-gray-600 uppercase">WEB URL / UPLOAD DOCUMENT</div>
            </div>
            <div className="flex border-b border-gray-200 hover:bg-gray-50/50 transition items-start py-4">
              <div className="w-16 text-center text-xs font-medium text-gray-700 pt-2">1</div>
              <div className="flex-1 px-4 text-xs font-medium text-gray-700 pt-2 pr-8">Detailed Document for School Infrastructure</div>
              <div className="w-[450px] px-4">
                <div className="flex flex-col gap-2">
                  <input 
                    type="text" 
                    placeholder="Paste URL link here..." 
                    value={infra.docUrl || ''}
                    onChange={(e) => setInfra({ ...infra, docUrl: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500 bg-white" 
                  />
                  <div className="flex items-center gap-2">
                    {infra.docAttachment || infra.docUrl ? (
                      <a 
                        href={infra.docAttachment || infra.docUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded"
                      >
                        <FaEye className="text-xs" />
                      </a>
                    ) : null}
                    <label className="flex items-center border border-gray-300 rounded overflow-hidden flex-1 bg-white cursor-pointer">
                      <span className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 border-r border-gray-300 whitespace-nowrap">Choose File</span>
                      <span className="px-3 text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                        {infra.docFileName || (infra.docAttachment ? "File attached" : "No file chosen")}
                      </span>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept=".pdf,.doc,.docx,image/*" 
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            handleFileUpload(e.target.files[0], (base64, name) => {
                              setInfra({ ...infra, docAttachment: base64, docFileName: name });
                            });
                          }
                        }} 
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section F */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#f8f9fb] px-5 py-4 flex items-center justify-between border-b border-gray-200">
            <div className="flex items-center gap-2">
              <FaFolder className="text-gray-600 text-sm" />
              <h2 className="text-sm font-bold text-gray-800">F. Other Vital Information</h2>
            </div>
            <div className="text-[10px] text-gray-500 font-medium uppercase">
              Provide Web URL or Upload Max 10MB PDF
            </div>
          </div>
          
          <div className="flex bg-gray-50/80 border-b border-gray-200 py-3">
            <div className="w-16 text-center text-[10px] font-bold text-gray-600 uppercase">S.NO</div>
            <div className="flex-1 px-4 text-[10px] font-bold text-gray-600 uppercase">DOCUMENTS / INFORMATION</div>
            <div className="w-[450px] px-4 text-[10px] font-bold text-gray-600 uppercase">WEB URL / UPLOAD DOCUMENT</div>
          </div>

          <div className="flex flex-col">
            {docsF.map((item, idx) => (
              <DocumentRow 
                key={`f-${idx}`} 
                index={idx + 1} 
                item={item} 
                onChange={(f, v) => handleDocChange(docsF, setDocsF, idx, f, v)} 
              />
            ))}
          </div>
        </div>

      </div>
      
      {/* Fixed Bottom Footer */}
      <div className="fixed bottom-0 right-0 left-64 bg-white border-t border-gray-200 p-4 flex justify-end items-center gap-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
        <button 
          onClick={fetchDisclosure}
          className="text-gray-500 hover:text-gray-800 text-sm font-medium transition"
        >
          Reset Form
        </button>
        <button 
          onClick={handleSave}
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-8 rounded shadow-sm transition disabled:opacity-50"
        >
          {submitting ? 'Saving...' : 'Save'}
        </button>
      </div>
      
    </div>
  );
}

