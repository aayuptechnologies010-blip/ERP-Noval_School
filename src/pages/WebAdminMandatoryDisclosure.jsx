import React from 'react';
import { 
  FaInfoCircle, FaFilePdf, FaGraduationCap, FaUserTie, FaEye, FaTrash, FaPlus, FaBuilding, FaYoutube, FaFolder
} from 'react-icons/fa';

export default function WebAdminMandatoryDisclosure() {

  const sectionBDocs = [
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

  const sectionCDocs = [
    "Fee Structure of the School",
    "Annual Academic Calendar",
    "List of School Management Committee (SMC)",
    "List of Parents Teachers Association (PTA) Members",
    "Last 3-Year Result of the Board Examination as per Applicability",
    "Central Board of Secondary Education School Performance Report Card",
    "Book List",
    "Disciplinary Committee"
  ];

  const sectionFDocs = [
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

  const DocumentRow = ({ index, title, isSub = false }) => (
    <div className={`flex border-b border-gray-200 hover:bg-gray-50/50 transition items-start py-4 ${isSub ? 'bg-gray-50/30' : ''}`}>
      <div className="w-16 text-center text-xs font-medium text-gray-700 pt-2">{index}</div>
      <div className="flex-1 px-4 text-xs font-medium text-gray-700 pt-2 pr-8">{title}</div>
      <div className="w-[450px] px-4">
        <div className="flex flex-col gap-2">
          <input 
            type="text" 
            placeholder="Paste URL link here..." 
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500 bg-white" 
          />
          <div className="flex items-center gap-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded"><FaEye className="text-xs" /></button>
            <button className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded"><FaTrash className="text-xs" /></button>
            <div className="flex items-center border border-gray-300 rounded overflow-hidden flex-1 bg-white">
              <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 border-r border-gray-300 whitespace-nowrap">Choose File</button>
              <span className="px-3 text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">No file chosen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const StaffRow = ({ index, title, hasNames = false, isSub = false, isNA = false }) => (
    <div className={`flex border-b border-gray-200 hover:bg-gray-50/50 transition items-start py-4 ${isSub ? 'bg-gray-50/30' : ''}`}>
      <div className="w-16 text-center text-xs font-medium text-gray-700 pt-2">{index}</div>
      <div className="w-64 px-4 text-xs font-bold text-gray-700 pt-2 pr-4">{title}</div>
      <div className="w-48 px-4">
        <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500 bg-white" />
      </div>
      <div className="flex-1 px-4">
        {isNA ? (
          <div className="bg-gray-100 h-full w-full flex items-center justify-center text-xs font-medium text-gray-500 rounded border border-gray-200 py-1.5">
            N/A
          </div>
        ) : hasNames ? (
          <div className="flex gap-2">
            <input type="text" placeholder="Name" className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500 bg-white" />
            <input type="text" placeholder="Qualification" className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500 bg-white" />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <input 
              type="text" 
              placeholder="Paste URL link here..." 
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500 bg-white" 
            />
            <div className="flex items-center gap-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded"><FaEye className="text-xs" /></button>
              <button className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded"><FaTrash className="text-xs" /></button>
              <div className="flex items-center border border-gray-300 rounded overflow-hidden flex-1 bg-white">
                <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 border-r border-gray-300 whitespace-nowrap">Choose File</button>
                <span className="px-3 text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">No file chosen</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const StaffSubTable = ({ title }) => (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider">{title}</h3>
        <button className="flex items-center gap-1.5 text-blue-600 text-xs font-bold hover:text-blue-700 transition">
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
            <tr className="border-b border-gray-100">
              <td className="px-3 py-3 text-center text-xs font-medium text-gray-700">1</td>
              <td className="px-3 py-3">
                <input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
              </td>
              <td className="px-3 py-3">
                <input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
              </td>
              <td className="px-3 py-3">
                <input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
              </td>
              <td className="px-3 py-3 text-center">
                <button className="text-red-500 hover:text-red-700 transition"><FaTrash className="text-xs mx-auto" /></button>
              </td>
            </tr>
          </tbody>
        </table>
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
              <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Affiliation No. (If Applicable)</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">School Code (If Applicable)</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Complete Address with Pin Code <span className="text-red-500">*</span></label>
              <textarea rows="3" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 resize-y"></textarea>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">School Email ID <span className="text-red-500">*</span></label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Contact Details (Landline/Mobile) <span className="text-red-500">*</span></label>
                <div className="flex gap-4">
                  <input type="text" placeholder="Landline" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                  <input type="text" placeholder="Mobile *" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
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
            {sectionBDocs.map((doc, idx) => (
              <DocumentRow key={`b-${idx}`} index={idx + 1} title={doc} />
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
            {sectionCDocs.map((doc, idx) => (
              <DocumentRow key={`c-${idx}`} index={idx + 1} title={doc} />
            ))}
          </div>
          
          {/* Result Sub-tables */}
          <div className="p-6 flex flex-col gap-8 bg-white border-t border-gray-200">
            
            {/* Class X Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider">RESULT CLASS: X</h3>
                <button className="flex items-center gap-1.5 text-blue-600 text-xs font-bold hover:text-blue-700 transition">
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
                    <tr className="border-b border-gray-100">
                      <td className="px-3 py-3 text-center text-xs font-medium text-gray-700">1</td>
                      <td className="px-3 py-3">
                        <input type="text" placeholder="e.g. 2022-2023" className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
                      </td>
                      <td className="px-3 py-3">
                        <input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
                      </td>
                      <td className="px-3 py-3">
                        <input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
                      </td>
                      <td className="px-3 py-3">
                        <input type="text" placeholder="%" className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
                      </td>
                      <td className="px-3 py-3">
                        <input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <button className="text-red-500 hover:text-red-700 transition"><FaTrash className="text-xs mx-auto" /></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Class XII Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider">RESULT CLASS: XII</h3>
                <button className="flex items-center gap-1.5 text-blue-600 text-xs font-bold hover:text-blue-700 transition">
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
                    <tr className="border-b border-gray-100">
                      <td className="px-3 py-3 text-center text-xs font-medium text-gray-700">1</td>
                      <td className="px-3 py-3">
                        <input type="text" placeholder="e.g. 2022-2023" className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
                      </td>
                      <td className="px-3 py-3">
                        <input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
                      </td>
                      <td className="px-3 py-3">
                        <input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
                      </td>
                      <td className="px-3 py-3">
                        <input type="text" placeholder="%" className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
                      </td>
                      <td className="px-3 py-3">
                        <input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <button className="text-red-500 hover:text-red-700 transition"><FaTrash className="text-xs mx-auto" /></button>
                      </td>
                    </tr>
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
          
          <div className="flex bg-gray-50/80 border-b border-gray-200 py-3">
            <div className="w-16 text-center text-[10px] font-bold text-gray-600 uppercase">S.NO</div>
            <div className="w-64 px-4 text-[10px] font-bold text-gray-600 uppercase">INFORMATION</div>
            <div className="w-48 px-4 text-[10px] font-bold text-gray-600 uppercase">NUMBER/STRENGTH</div>
            <div className="flex-1 px-4 text-[10px] font-bold text-gray-600 uppercase">NAME & QUALIFICATIONS / WEB URL / UPLOAD PDF</div>
          </div>

          <div className="flex flex-col">
            <StaffRow index="1" title="PRINCIPAL" hasNames={true} />
            <StaffRow index="2" title="VICE PRINCIPAL" hasNames={true} />
            <StaffRow index="3" title="HEAD MASTER/HEAD MISTRESS" hasNames={true} />
            <StaffRow index="4" title="TOTAL NO OF TEACHERS" />
            <StaffRow index="" title="o PGT" isSub={true} />
            <StaffRow index="" title="o TGT" isSub={true} />
            <StaffRow index="" title="o PRT" isSub={true} />
            <StaffRow index="" title="o PET" isSub={true} />
            <StaffRow index="" title="o NTT" isSub={true} />
            <StaffRow index="" title="o PTI" isSub={true} />
            <StaffRow index="5" title="OFFICE STAFF" />
            <StaffRow index="6" title="TEACHERS SECTION RATIO" isNA={true} />
          </div>

          <div className="p-6 flex flex-col gap-8 bg-white border-t border-gray-200">
            <StaffSubTable title="DETAILS OF SPECIAL EDUCATOR" />
            <StaffSubTable title="DETAILS OF COUNSELLOR" />
            <StaffSubTable title="DETAILS OF COUNSELLOR & WELLNESS TEACHER" />
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
              <input type="number" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">No. and Size of the Class Rooms (in Sq Mtr)</label>
              <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">No. and Size of Laboratories including Computer Labs (in Sq Mtr)</label>
              <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">No. and Size of Laboratories Including Computer Labs (In Sq Mtr)</label>
              <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">No. And Size of Library (IN SQR MTR)</label>
              <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Internet Facility</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">No. of Girls Toilets</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">No. of Boys Toilets</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="w-full md:w-1/3 pr-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">No. of CWSN Toilets</label>
              <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Link of YouTube Video of Inspection</label>
              <div className="relative">
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 pl-9 text-sm text-gray-600 outline-none focus:border-blue-500" />
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
            <DocumentRow index="1" title="Detailed Document for School Infrastructure" />
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
            {sectionFDocs.map((doc, idx) => (
              <DocumentRow key={`f-${idx}`} index={idx + 1} title={doc} />
            ))}
          </div>
        </div>

      </div>
      
      {/* Fixed Bottom Footer */}
      <div className="fixed bottom-0 right-0 left-64 bg-white border-t border-gray-200 p-4 flex justify-end items-center gap-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
        <button className="text-gray-500 hover:text-gray-800 text-sm font-medium transition">Reset Form</button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-8 rounded shadow-sm transition">Save</button>
      </div>
      
    </div>
  );
}
