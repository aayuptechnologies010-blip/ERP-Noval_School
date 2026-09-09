import fs from 'fs';

const path = 'panel/src/layouts/AdmissionLayout.jsx';
let content = fs.readFileSync(path, 'utf8');

console.log('Starting table replacements, original length:', content.length);

// 1. Student HouseWise Strength Report
const shsrOld = `                                        <tbody>
                                          <tr className="bg-white border-b border-[#cca766] font-bold text-[11px]">
                                            <td colSpan="4" className="px-2 py-1 text-gray-800">Class : {shsrClass === 'All Classes' ? '2' : shsrClass}</td>
                                          </tr>
                                          <tr className="border-b border-[#cca766] divide-x divide-[#cca766]">
                                            <td className="px-2 py-1 text-center font-medium">1</td>
                                            <td className="px-2 py-1 font-medium">{shsrSection === 'All Sections' ? 'B' : shsrSection}</td>
                                            <td className="px-2 py-1 text-right font-medium">38</td>
                                            <td className="px-2 py-1 text-right font-medium">38</td>
                                          </tr>
                                          <tr className="border-b border-[#cca766] font-bold divide-x divide-[#cca766] bg-gray-50">
                                            <td colSpan="2" className="px-2 py-1 text-center">Total</td>
                                            <td className="px-2 py-1 text-right">38</td>
                                            <td className="px-2 py-1 text-right">38</td>
                                          </tr>
                                          <tr className="font-bold divide-x divide-[#cca766] bg-gray-50">
                                            <td colSpan="2" className="px-2 py-1 text-center">G. Total</td>
                                            <td className="px-2 py-1 text-right">38</td>
                                            <td className="px-2 py-1 text-right">38</td>
                                          </tr>
                                        </tbody>`;

const shsrNew = `                                        <tbody>
                                          <tr className="bg-white border-b border-[#cca766] font-bold text-[11px]">
                                            <td colSpan="4" className="px-2 py-1 text-gray-800">Class : {shsrClass}</td>
                                          </tr>
                                          {shsrList.length === 0 ? (
                                            <tr><td colSpan="4" className="text-center py-3 text-gray-500 font-medium">No record found !</td></tr>
                                          ) : (
                                            shsrList.map((row, idx) => (
                                              <tr key={idx} className="border-b border-[#cca766] divide-x divide-[#cca766]">
                                                <td className="px-2 py-1 text-center font-medium">{idx + 1}</td>
                                                <td className="px-2 py-1 font-medium">Section {row.section}</td>
                                                <td className="px-2 py-1 text-right font-medium">{row.total}</td>
                                                <td className="px-2 py-1 text-right font-bold text-blue-700">{row.total}</td>
                                              </tr>
                                            ))
                                          )}
                                          <tr className="border-b border-[#cca766] font-bold divide-x divide-[#cca766] bg-gray-50">
                                            <td colSpan="2" className="px-2 py-1 text-center">Total</td>
                                            <td className="px-2 py-1 text-right">{shsrList.reduce((acc, r) => acc + r.total, 0)}</td>
                                            <td className="px-2 py-1 text-right text-blue-700">{shsrList.reduce((acc, r) => acc + r.total, 0)}</td>
                                          </tr>
                                        </tbody>`;

if (content.includes(shsrOld)) {
  content = content.replace(shsrOld, shsrNew);
  console.log('✓ 1. Replaced Student HouseWise Strength Report table');
}

// 2. Student Document Details
const sddOld = `                                        <tbody>
                                          <tr>
                                            <td colSpan="8" className="px-3 py-4 text-center text-xs text-gray-500 font-medium">
                                              No record found!
                                            </td>
                                          </tr>
                                        </tbody>`;

const sddNew = `                                        <tbody>
                                          {sddList.filter(row => !sddSearch || Object.values(row).some(v => String(v).toLowerCase().includes(sddSearch.toLowerCase()))).length === 0 ? (
                                            <tr>
                                              <td colSpan="8" className="px-3 py-4 text-center text-xs text-gray-500 font-medium">
                                                No record found!
                                              </td>
                                            </tr>
                                          ) : (
                                            sddList
                                              .filter(row => !sddSearch || Object.values(row).some(v => String(v).toLowerCase().includes(sddSearch.toLowerCase())))
                                              .map((row, idx) => (
                                                <tr key={row._id || idx} className="border-b border-gray-200 hover:bg-yellow-50 text-[11px]">
                                                  <td className="px-2 py-1.5">{idx + 1}</td>
                                                  <td className="px-2 py-1.5 font-semibold text-blue-700">{row.regNo}</td>
                                                  <td className="px-2 py-1.5 font-bold text-gray-900">{row.studentName}</td>
                                                  <td className="px-2 py-1.5">{row.class}</td>
                                                  <td className="px-2 py-1.5">{row.section}</td>
                                                  <td className="px-2 py-1.5">{row.fatherName}</td>
                                                  <td className="px-2 py-1.5 font-mono">{row.contact}</td>
                                                  <td className="px-2 py-1.5 font-semibold text-green-700">{row.documentStatus}</td>
                                                </tr>
                                              ))
                                          )}
                                        </tbody>`;

if (content.includes(sddOld)) {
  content = content.replace(sddOld, sddNew);
  console.log('✓ 2. Replaced Student Document Details table');
}

// 3. Class Wise Admission report
const cwarOld = `                                        <tbody>
                                          <tr>
                                            <td colSpan="11" className="px-3 py-4 text-center text-xs text-gray-500 font-medium">
                                              No record found!
                                            </td>
                                          </tr>
                                        </tbody>`;

const cwarNew = `                                        <tbody>
                                          {cwarList.filter(row => !cwarSearch || Object.values(row).some(v => String(v).toLowerCase().includes(cwarSearch.toLowerCase()))).length === 0 ? (
                                            <tr>
                                              <td colSpan="11" className="px-3 py-4 text-center text-xs text-gray-500 font-medium">
                                                No record found!
                                              </td>
                                            </tr>
                                          ) : (
                                            cwarList
                                              .filter(row => !cwarSearch || Object.values(row).some(v => String(v).toLowerCase().includes(cwarSearch.toLowerCase())))
                                              .map((row, idx) => (
                                                <tr key={row._id || idx} className="border-b border-gray-200 hover:bg-yellow-50 text-[11px]">
                                                  <td className="px-2 py-1.5">{idx + 1}</td>
                                                  <td className="px-2 py-1.5 font-semibold text-blue-700">{row.admNo}</td>
                                                  <td className="px-2 py-1.5">{row.doAd || '01-Apr-2026'}</td>
                                                  <td className="px-2 py-1.5 font-bold">{row.className || row.class}</td>
                                                  <td className="px-2 py-1.5 font-bold text-gray-900">{row.name}</td>
                                                  <td className="px-2 py-1.5">{row.dob}</td>
                                                  <td className="px-2 py-1.5">{row.father}</td>
                                                  <td className="px-2 py-1.5">{row.stream || 'General'}</td>
                                                  <td className="px-2 py-1.5">{row.optSub || 'N/A'}</td>
                                                  <td className="px-2 py-1.5 font-mono">{row.contact}</td>
                                                  <td className="px-2 py-1.5 text-gray-600">{row.lastSc || 'Navals National Academy'}</td>
                                                </tr>
                                              ))
                                          )}
                                        </tbody>`;

if (content.includes(cwarOld)) {
  content = content.replace(cwarOld, cwarNew);
  console.log('✓ 3. Replaced Class Wise Admission report table');
}

// 4. Student Repeater list
const srlOld = `                                        <tbody>
                                          <tr>
                                            <td colSpan="9" className="px-3 py-4 text-center text-xs text-gray-500 font-medium">
                                              No record found!
                                            </td>
                                          </tr>
                                        </tbody>`;

const srlNew = `                                        <tbody>
                                          {srlList.filter(row => !srlSearch || Object.values(row).some(v => String(v).toLowerCase().includes(srlSearch.toLowerCase()))).length === 0 ? (
                                            <tr>
                                              <td colSpan="9" className="px-3 py-4 text-center text-xs text-gray-500 font-medium">
                                                No record found!
                                              </td>
                                            </tr>
                                          ) : (
                                            srlList
                                              .filter(row => !srlSearch || Object.values(row).some(v => String(v).toLowerCase().includes(srlSearch.toLowerCase())))
                                              .map((row, idx) => (
                                                <tr key={row.admNo || idx} className="border-b border-gray-200 hover:bg-yellow-50 text-[11px]">
                                                  <td className="px-2 py-1.5 font-semibold text-blue-700">{row.admNo}</td>
                                                  <td className="px-2 py-1.5">{row.class}</td>
                                                  <td className="px-2 py-1.5">{row.section}</td>
                                                  <td className="px-2 py-1.5 font-mono">{row.rollNo}</td>
                                                  <td className="px-2 py-1.5 font-bold text-gray-900">{row.name}</td>
                                                  <td className="px-2 py-1.5">{row.dob}</td>
                                                  <td className="px-2 py-1.5">{row.father}</td>
                                                  <td className="px-2 py-1.5">{row.mother}</td>
                                                  <td className="px-2 py-1.5 font-mono">{row.mobile}</td>
                                                </tr>
                                              ))
                                          )}
                                        </tbody>`;

if (content.includes(srlOld)) {
  content = content.replace(srlOld, srlNew);
  console.log('✓ 4. Replaced Student Repeater list table');
}

// 5. Verification Admission Form letter table
const vafTableOld = `                                    <table className="w-full border-collapse border border-gray-400 text-[10px] mt-2">
                                      <tbody>
                                        <tr className="border border-gray-300">
                                          <td className="px-2 py-1 font-bold border-r border-gray-300 bg-gray-50 w-40">Index No.</td>
                                          <td className="px-2 py-1"></td>
                                          <td className="px-2 py-1 font-bold border-l border-r border-gray-300 bg-gray-50 w-40">Date of Birth</td>
                                          <td className="px-2 py-1"></td>
                                        </tr>
                                        <tr className="border border-gray-300">
                                          <td className="px-2 py-1 font-bold border-r border-gray-300 bg-gray-50">Full Name</td>
                                          <td className="px-2 py-1"></td>
                                          <td className="px-2 py-1 font-bold border-l border-r border-gray-300 bg-gray-50">Sex</td>
                                          <td className="px-2 py-1"></td>
                                        </tr>
                                        <tr className="border border-gray-300">
                                          <td className="px-2 py-1 font-bold border-r border-gray-300 bg-gray-50">Mother's Name</td>
                                          <td className="px-2 py-1"></td>
                                          <td className="px-2 py-1 font-bold border-l border-r border-gray-300 bg-gray-50">Nationality</td>
                                          <td className="px-2 py-1"></td>
                                        </tr>
                                        <tr className="border border-gray-300">
                                          <td className="px-2 py-1 font-bold border-r border-gray-300 bg-gray-50">Father's Name</td>
                                          <td className="px-2 py-1"></td>
                                          <td className="px-2 py-1 font-bold border-l border-r border-gray-300 bg-gray-50">Religion</td>
                                          <td className="px-2 py-1"></td>
                                        </tr>
                                      </tbody>
                                    </table>`;

const vafTableNew = `                                    {(() => {
                                      const activeStudent = vafList.find(s => s.name.toLowerCase().includes(vafStudent.toLowerCase())) || vafList.find(s => s.name.toLowerCase().includes('aayup')) || vafList[0] || {};
                                      return (
                                        <table className="w-full border-collapse border border-gray-400 text-[10px] mt-2">
                                          <tbody>
                                            <tr className="border border-gray-300">
                                              <td className="px-2 py-1 font-bold border-r border-gray-300 bg-gray-50 w-40">Index No. / Adm No.</td>
                                              <td className="px-2 py-1 font-semibold text-blue-700">{activeStudent.admNo || 'ADM-1001'}</td>
                                              <td className="px-2 py-1 font-bold border-l border-r border-gray-300 bg-gray-50 w-40">Date of Birth</td>
                                              <td className="px-2 py-1 font-medium">{activeStudent.dob || '15-Apr-2022'}</td>
                                            </tr>
                                            <tr className="border border-gray-300">
                                              <td className="px-2 py-1 font-bold border-r border-gray-300 bg-gray-50">Full Name</td>
                                              <td className="px-2 py-1 font-bold text-gray-900">{activeStudent.name || 'AAYUP KUMAR'}</td>
                                              <td className="px-2 py-1 font-bold border-l border-r border-gray-300 bg-gray-50">Sex</td>
                                              <td className="px-2 py-1">{activeStudent.gender || 'Male'}</td>
                                            </tr>
                                            <tr className="border border-gray-300">
                                              <td className="px-2 py-1 font-bold border-r border-gray-300 bg-gray-50">Mother's Name</td>
                                              <td className="px-2 py-1">{activeStudent.mother || 'POOJA KUMAR'}</td>
                                              <td className="px-2 py-1 font-bold border-l border-r border-gray-300 bg-gray-50">Nationality</td>
                                              <td className="px-2 py-1">{activeStudent.nationality || 'Indian'}</td>
                                            </tr>
                                            <tr className="border border-gray-300">
                                              <td className="px-2 py-1 font-bold border-r border-gray-300 bg-gray-50">Father's Name</td>
                                              <td className="px-2 py-1">{activeStudent.father || 'SUNIL KUMAR'}</td>
                                              <td className="px-2 py-1 font-bold border-l border-r border-gray-300 bg-gray-50">Religion</td>
                                              <td className="px-2 py-1">{activeStudent.religion || 'HINDU'}</td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      );
                                    })()}`;

if (content.includes(vafTableOld)) {
  content = content.replace(vafTableOld, vafTableNew);
  console.log('✓ 5. Replaced Verification Admission Form table with dynamic student record');
}

// 6. Admission Withdrawal Register
const awrOld = `                                      <tbody>
                                        <tr><td colSpan="23" className="text-center py-3 text-gray-500 font-medium border border-gray-400">No record found !</td></tr>
                                      </tbody>`;

const awrNew = `                                      <tbody>
                                        {awrList.filter(row => !awrSearch || Object.values(row).some(v => String(v).toLowerCase().includes(awrSearch.toLowerCase()))).length === 0 ? (
                                          <tr><td colSpan="23" className="text-center py-3 text-gray-500 font-medium border border-gray-400">No record found !</td></tr>
                                        ) : (
                                          awrList
                                            .filter(row => !awrSearch || Object.values(row).some(v => String(v).toLowerCase().includes(awrSearch.toLowerCase())))
                                            .map((row, idx) => (
                                              <tr key={row._id || idx} className="divide-x divide-gray-400 border border-gray-400 hover:bg-yellow-50 text-[9px]">
                                                <td className="px-1 py-1 text-center font-medium">{idx + 1}</td>
                                                <td className="px-1 py-1 whitespace-nowrap">{row.doAd || '01-Apr-2026'}</td>
                                                <td className="px-1 py-1 font-bold text-gray-900 whitespace-nowrap">{row.name}</td>
                                                <td className="px-1 py-1 font-semibold text-blue-700">{row.admNo}</td>
                                                <td className="px-1 py-1 whitespace-nowrap">{row.mother || '-'}</td>
                                                <td className="px-1 py-1 whitespace-nowrap">{row.father || '-'}</td>
                                                <td className="px-1 py-1 whitespace-nowrap text-gray-600">{row.address}</td>
                                                <td className="px-1 py-1 whitespace-nowrap text-gray-600">{row.address}</td>
                                                <td className="px-1 py-1 whitespace-nowrap text-gray-600">{row.address}</td>
                                                <td className="px-1 py-1 whitespace-nowrap">{row.father}</td>
                                                <td className="px-1 py-1 text-center">{row.category}</td>
                                                <td className="px-1 py-1 text-center font-bold">{row.className}</td>
                                                <td className="px-1 py-1 whitespace-nowrap">{row.dob}</td>
                                                <td className="px-1 py-1 font-semibold text-blue-700">{row.admNo}</td>
                                                <td className="px-1 py-1">{row.aadhaar || '-'}</td>
                                                <td className="px-1 py-1 text-green-700 font-medium">Verified</td>
                                                <td className="px-1 py-1 whitespace-nowrap">Navals National Academy</td>
                                                <td className="px-1 py-1 text-center">-</td>
                                                <td className="px-1 py-1 text-center">-</td>
                                                <td className="px-1 py-1 font-mono">{row.contact}</td>
                                                <td className="px-1 py-1 text-center font-serif text-gray-500">Signed</td>
                                                <td className="px-1 py-1 text-center font-serif text-gray-500">Verified</td>
                                                <td className="px-1 py-1 text-center">-</td>
                                              </tr>
                                            ))
                                        )}
                                      </tbody>`;

if (content.includes(awrOld)) {
  content = content.replace(awrOld, awrNew);
  console.log('✓ 6. Replaced Admission Withdrawal Register table');
}

// 7. Challan Amount Collection Report
const cacrOld = `                                        <tbody>
                                          <tr><td colSpan="10" className="text-center py-3 text-gray-500 font-medium">No record found !</td></tr>
                                        </tbody>`;

const cacrNew = `                                        <tbody>
                                          {cacrList.filter(row => !cacrSearch || Object.values(row).some(v => String(v).toLowerCase().includes(cacrSearch.toLowerCase()))).length === 0 ? (
                                            <tr><td colSpan="10" className="text-center py-3 text-gray-500 font-medium">No record found !</td></tr>
                                          ) : (
                                            cacrList
                                              .filter(row => !cacrSearch || Object.values(row).some(v => String(v).toLowerCase().includes(cacrSearch.toLowerCase())))
                                              .map((row, idx) => (
                                                <tr key={row._id || idx} className="border-b border-gray-200 hover:bg-yellow-50 text-[11px]">
                                                  <td className="px-2 py-1.5">{idx + 1}</td>
                                                  <td className="px-2 py-1.5">{row.date}</td>
                                                  <td className="px-2 py-1.5 font-semibold text-blue-700">{row.regNo}</td>
                                                  <td className="px-2 py-1.5 font-mono">{row.refNo}</td>
                                                  <td className="px-2 py-1.5 font-bold text-gray-900">{row.studentName}</td>
                                                  <td className="px-2 py-1.5">{row.className}</td>
                                                  <td className="px-2 py-1.5">{row.fatherName}</td>
                                                  <td className="px-2 py-1.5 font-bold text-green-700">₹{row.amount}</td>
                                                  <td className="px-2 py-1.5 text-gray-700">{row.payMode}</td>
                                                  <td className="px-2 py-1.5 text-green-700 font-semibold">Active</td>
                                                </tr>
                                              ))
                                          )}
                                        </tbody>`;

if (content.includes(cacrOld)) {
  content = content.replace(cacrOld, cacrNew);
  console.log('✓ 7. Replaced Challan Amount Collection Report table');
}

// 8. Total Collection Report Student Wise
const tcrOld = `                                        <tbody>
                                          <tr><td colSpan="14" className="text-center py-3 text-gray-500 font-medium">No record found !</td></tr>
                                        </tbody>`;

const tcrNew = `                                        <tbody>
                                          {tcrList.filter(row => !tcrSearch || Object.values(row).some(v => String(v).toLowerCase().includes(tcrSearch.toLowerCase()))).length === 0 ? (
                                            <tr><td colSpan="14" className="text-center py-3 text-gray-500 font-medium">No record found !</td></tr>
                                          ) : (
                                            tcrList
                                              .filter(row => !tcrSearch || Object.values(row).some(v => String(v).toLowerCase().includes(tcrSearch.toLowerCase())))
                                              .map((row, idx) => (
                                                <tr key={idx} className="border-b border-gray-200 hover:bg-yellow-50 text-[11px]">
                                                  <td className="px-2 py-1.5 font-bold text-gray-900">{row.studentName}</td>
                                                  <td className="px-2 py-1.5">{row.fatherName}</td>
                                                  <td className="px-2 py-1.5 font-mono">{row.contact}</td>
                                                  <td className="px-2 py-1.5 font-semibold text-blue-700">{row.receiptId}</td>
                                                  <td className="px-2 py-1.5 font-mono">{row.refNo}</td>
                                                  <td className="px-2 py-1.5 font-medium">{row.type}</td>
                                                  <td className="px-2 py-1.5">{row.date}</td>
                                                  <td className="px-2 py-1.5 font-bold text-green-700">₹{row.amount}</td>
                                                </tr>
                                              ))
                                          )}
                                        </tbody>`;

if (content.includes(tcrOld)) {
  content = content.replace(tcrOld, tcrNew);
  console.log('✓ 8. Replaced Total Collection Report Student Wise table');
}

// 9. Manual List Generation Report
const mlgrOld = `                                        <tbody>
                                          <tr><td colSpan="7" className="text-center py-3 text-gray-500 font-medium">No record found !</td></tr>
                                        </tbody>`;

const mlgrNew = `                                        <tbody>
                                          {mlgrList.filter(row => !mlgrSearch || Object.values(row).some(v => String(v).toLowerCase().includes(mlgrSearch.toLowerCase()))).length === 0 ? (
                                            <tr><td colSpan="7" className="text-center py-3 text-gray-500 font-medium">No record found !</td></tr>
                                          ) : (
                                            mlgrList
                                              .filter(row => !mlgrSearch || Object.values(row).some(v => String(v).toLowerCase().includes(mlgrSearch.toLowerCase())))
                                              .map((row, idx) => (
                                                <tr key={row._id || idx} className="border-b border-gray-200 hover:bg-yellow-50 text-[11px]">
                                                  <td className="px-2 py-1.5">{idx + 1}</td>
                                                  <td className="px-2 py-1.5 font-semibold text-blue-700">{row.regNo}</td>
                                                  <td className="px-2 py-1.5 font-bold text-gray-900">{row.studentName}</td>
                                                  <td className="px-2 py-1.5">{row.class}</td>
                                                  <td className="px-2 py-1.5">{row.fatherName}</td>
                                                  <td className="px-2 py-1.5">{row.date}</td>
                                                  <td className="px-2 py-1.5 font-bold text-green-700">{row.status}</td>
                                                </tr>
                                              ))
                                          )}
                                        </tbody>`;

if (content.includes(mlgrOld)) {
  content = content.replace(mlgrOld, mlgrNew);
  console.log('✓ 9. Replaced Manual List Generation Report table');
}

// 10. Student Modification History Report
const smhrOld = `                                    <div className="border border-[#cca766] mt-3">
                                      <div className="border-b border-[#cca766] px-3 py-1.5 font-bold text-xs text-gray-900 bg-[#fffdfa]">
                                        STUDENT MODIFICATION HISTORY REPORT as on 03 Sep-2026 at 02:48 PM
                                      </div>
                                      <div className="py-6 text-center text-red-500 font-bold text-sm">No record found!</div>
                                    </div>`;

const smhrNew = `                                    <div className="border border-[#cca766] mt-3">
                                      <div className="border-b border-[#cca766] px-3 py-1.5 font-bold text-xs text-gray-900 bg-[#fffdfa]">
                                        STUDENT MODIFICATION HISTORY REPORT as on 03 Sep-2026 at 02:48 PM
                                      </div>
                                      <div className="overflow-x-auto">
                                        <table className="min-w-full text-xs text-left border-collapse">
                                          <thead className="bg-[#fcf5e5] border-b border-[#cca766] text-[10px] font-bold text-gray-900 uppercase">
                                            <tr>
                                              <th className="px-2 py-1.5">SN</th>
                                              <th className="px-2 py-1.5">DATE</th>
                                              <th className="px-2 py-1.5">ADM NO</th>
                                              <th className="px-2 py-1.5">STUDENT NAME</th>
                                              <th className="px-2 py-1.5">FIELD MODIFIED</th>
                                              <th className="px-2 py-1.5">OLD VALUE</th>
                                              <th className="px-2 py-1.5">NEW VALUE</th>
                                              <th className="px-2 py-1.5">MODIFIED BY</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {smhrList.filter(row => !smhrSearch || Object.values(row).some(v => String(v).toLowerCase().includes(smhrSearch.toLowerCase()))).length === 0 ? (
                                              <tr><td colSpan="8" className="py-6 text-center text-red-500 font-bold text-sm">No record found!</td></tr>
                                            ) : (
                                              smhrList
                                                .filter(row => !smhrSearch || Object.values(row).some(v => String(v).toLowerCase().includes(smhrSearch.toLowerCase())))
                                                .map((row, idx) => (
                                                  <tr key={idx} className="border-b border-gray-200 hover:bg-yellow-50 text-[11px]">
                                                    <td className="px-2 py-1.5">{idx + 1}</td>
                                                    <td className="px-2 py-1.5">{row.date}</td>
                                                    <td className="px-2 py-1.5 font-semibold text-blue-700">{row.admNo}</td>
                                                    <td className="px-2 py-1.5 font-bold text-gray-900">{row.studentName}</td>
                                                    <td className="px-2 py-1.5 font-medium text-amber-800">{row.field}</td>
                                                    <td className="px-2 py-1.5 text-gray-500">{row.oldValue}</td>
                                                    <td className="px-2 py-1.5 font-bold text-green-700">{row.newValue}</td>
                                                    <td className="px-2 py-1.5 text-gray-600">{row.modifiedBy}</td>
                                                  </tr>
                                                ))
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>`;

if (content.includes(smhrOld)) {
  content = content.replace(smhrOld, smhrNew);
  console.log('✓ 10. Replaced Student Modification History Report table');
}

// 11. Certificates History
const chOld = `                                    <div className="border border-[#cca766] mt-3">
                                      <div className="border-b border-[#cca766] px-3 py-1.5 font-bold text-xs text-gray-900 bg-[#fffdfa]">
                                        CERTIFICATES HISTORY REPORT as on 03-Sep-2026 at 02:48 PM
                                      </div>
                                      <div className="py-6 text-center text-red-500 font-bold text-sm">No record found!</div>
                                    </div>`;

const chNew = `                                    <div className="border border-[#cca766] mt-3">
                                      <div className="border-b border-[#cca766] px-3 py-1.5 font-bold text-xs text-gray-900 bg-[#fffdfa]">
                                        CERTIFICATES HISTORY REPORT as on 03-Sep-2026 at 02:48 PM
                                      </div>
                                      <div className="overflow-x-auto">
                                        <table className="min-w-full text-xs text-left border-collapse">
                                          <thead className="bg-[#fcf5e5] border-b border-[#cca766] text-[10px] font-bold text-gray-900 uppercase">
                                            <tr>
                                              <th className="px-2 py-1.5">SN</th>
                                              <th className="px-2 py-1.5">DATE</th>
                                              <th className="px-2 py-1.5">CERTIFICATE NO</th>
                                              <th className="px-2 py-1.5">TYPE</th>
                                              <th className="px-2 py-1.5">ADM NO</th>
                                              <th className="px-2 py-1.5">STUDENT NAME</th>
                                              <th className="px-2 py-1.5">CLASS</th>
                                              <th className="px-2 py-1.5">PURPOSE</th>
                                              <th className="px-2 py-1.5">STATUS</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {chList.filter(row => !chSearch || Object.values(row).some(v => String(v).toLowerCase().includes(chSearch.toLowerCase()))).length === 0 ? (
                                              <tr><td colSpan="9" className="py-6 text-center text-red-500 font-bold text-sm">No record found!</td></tr>
                                            ) : (
                                              chList
                                                .filter(row => !chSearch || Object.values(row).some(v => String(v).toLowerCase().includes(chSearch.toLowerCase())))
                                                .map((row, idx) => (
                                                  <tr key={row._id || idx} className="border-b border-gray-200 hover:bg-yellow-50 text-[11px]">
                                                    <td className="px-2 py-1.5">{idx + 1}</td>
                                                    <td className="px-2 py-1.5">{row.date}</td>
                                                    <td className="px-2 py-1.5 font-semibold text-blue-700">{row.certNo}</td>
                                                    <td className="px-2 py-1.5 font-medium text-purple-700">{row.type}</td>
                                                    <td className="px-2 py-1.5">{row.admNo}</td>
                                                    <td className="px-2 py-1.5 font-bold text-gray-900">{row.studentName}</td>
                                                    <td className="px-2 py-1.5">{row.class}</td>
                                                    <td className="px-2 py-1.5">{row.purpose}</td>
                                                    <td className="px-2 py-1.5 font-bold text-green-700">{row.status}</td>
                                                  </tr>
                                                ))
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>`;

if (content.includes(chOld)) {
  content = content.replace(chOld, chNew);
  console.log('✓ 11. Replaced Certificates History Report table');
}

fs.writeFileSync(path, content, 'utf8');
console.log('All remaining 11 tables updated successfully! Final length:', content.length);
