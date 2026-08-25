import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { FaMale, FaFemale, FaRegBuilding, FaGlobe } from 'react-icons/fa';

// --- Data for charts ---
const strengthData = [
  { name: 'NUR', total: 46, new: 11 },
  { name: 'LKG', total: 51, new: 11 },
  { name: 'UKG', total: 61, new: 15 },
  { name: '1', total: 69, new: 13 },
  { name: '2', total: 80, new: 9 },
  { name: '3', total: 54, new: 17 },
  { name: '4', total: 73, new: 9 },
  { name: '5', total: 48, new: 22 },
  { name: '6', total: 73, new: 13 },
  { name: '7', total: 69, new: 14 },
  { name: '8', total: 73, new: 9 },
  { name: '9', total: 95, new: 0 },
  { name: '10', total: 203, new: 0 },
  { name: '11', total: 122, new: 65 },
  { name: '12', total: 119, new: 1 },
];

const comparisonData = [
  { name: 'TOTAL STUDENT', prev: 1057, curr: 1236 },
  { name: 'BOYS', prev: 649, curr: 782 },
  { name: 'GIRLS', prev: 408, curr: 454 },
  { name: 'NEW ADMISSION', prev: 466, curr: 288 },
  { name: 'TC TAKEN', prev: 0, curr: 0 },
  { name: 'LEFT', prev: 105, curr: 79 },
];

const newAdmission7Days = [
  { name: 'Boys', value: 1, color: '#00a8e8' },
];

const standardWiseData = [
  { name: 'Old', value: 43, color: '#fbc02d' },
  { name: 'New Admission', value: 3, color: '#00a8e8' },
];

const religionData = [
  { name: 'NA', value: 0 },
  { name: 'MUSLIM', value: 86, color: '#fbc02d' }, // approx 7%
  { name: 'HINDU', value: 655, color: '#f0ad4e' }, // approx 53%
  { name: 'O.B.C.', value: 148, color: '#5cb85c' }, // approx 12%
  { name: 'S.C.', value: 321, color: '#d9534f' }, // approx 26%
  { name: 'GENERAL', value: 12, color: '#c9302c' }, // approx 1%
  { name: 'S.T.', value: 0 },
];

const categoryData = [
  { name: 'NA', value: 1, color: '#d9534f' },
  { name: 'Gen', value: 1186, color: '#d9534f' }, // 96%
  { name: 'OBC', value: 37, color: '#fbc02d' },
  { name: 'SC', value: 12, color: '#5cb85c' },
];

function AdmissionDashboard() {
  return (
    <div className="flex flex-col gap-4 pb-10">
      
      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1 */}
        <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
          <h3 className="text-[11px] font-bold text-gray-700 mb-2 text-center">STUDENT HEAD COUNT (YTD)</h3>
          <div className="text-center text-lg text-gray-800 mb-4">Total: <span className="font-bold text-xl">1236</span></div>
          
          <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
            <div className="flex items-center gap-1"><FaMale className="text-gray-400 text-lg" /> Boys</div>
            <div className="font-bold text-gray-800">782(63%)</div>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded mb-4">
            <div className="bg-gray-400 h-1.5 rounded" style={{ width: '63%' }}></div>
          </div>
          
          <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
            <div className="flex items-center gap-1"><FaFemale className="text-red-400 text-lg" /> Girls</div>
            <div className="font-bold text-gray-800">454(37%)</div>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded">
            <div className="bg-red-400 h-1.5 rounded" style={{ width: '37%' }}></div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
          <h3 className="text-[11px] font-bold text-gray-700 mb-2 text-center">NEW ADMISSION STATISTICS</h3>
          <div className="text-center text-lg text-gray-800 mb-4">Total: <span className="font-bold text-xl">288</span></div>
          
          <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
            <div className="flex items-center gap-1"><FaRegBuilding className="text-yellow-500" /> Reg. at school</div>
            <div className="font-bold text-gray-800">288(100%)</div>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded mb-4">
            <div className="bg-yellow-500 h-1.5 rounded" style={{ width: '100%' }}></div>
          </div>
          
          <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
            <div className="flex items-center gap-1"><FaGlobe className="text-blue-400" /> Online Reg.</div>
            <div className="font-bold text-gray-800">0(0%)</div>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded">
            <div className="bg-blue-400 h-1.5 rounded" style={{ width: '0%' }}></div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
          <h3 className="text-[11px] font-bold text-gray-700 mb-4 text-center">NEW ADMISSION RATIO (VS.PREV YEAR)</h3>
          
          <div className="flex justify-end gap-6 mb-2">
            <span className="text-[10px] font-bold text-gray-500">THIS YEAR</span>
            <span className="text-[10px] font-bold text-gray-500">PREV YEAR</span>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 text-sm text-gray-600 w-1/3"><FaMale className="text-gray-400 text-lg" /> Boys</div>
            <div className="text-sm font-bold text-gray-800 w-1/3 text-right">199(-31.38%)</div>
            <div className="text-sm font-bold text-gray-800 w-1/4 text-right">290</div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm text-gray-600 w-1/3"><FaFemale className="text-red-400 text-lg" /> Girls</div>
            <div className="text-sm font-bold text-gray-800 w-1/3 text-right">89(-49.43%)</div>
            <div className="text-sm font-bold text-gray-800 w-1/4 text-right">176</div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
          <h3 className="text-[11px] font-bold text-gray-700 mb-4 text-center">STUDENT STATISTICS (VS.PREV YEAR)</h3>
          
          <div className="flex justify-end gap-6 mb-2">
            <span className="text-[10px] font-bold text-gray-500">THIS YEAR</span>
            <span className="text-[10px] font-bold text-gray-500">PREV YEAR</span>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 text-sm text-gray-600 w-1/3"><FaMale className="text-gray-400 text-lg" /> Boys</div>
            <div className="text-sm font-bold text-gray-800 w-1/3 text-right">782(20.49%)</div>
            <div className="text-sm font-bold text-gray-800 w-1/4 text-right">649</div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm text-gray-600 w-1/3"><FaFemale className="text-red-400 text-lg" /> Girls</div>
            <div className="text-sm font-bold text-gray-800 w-1/3 text-right">454(11.27%)</div>
            <div className="text-sm font-bold text-gray-800 w-1/4 text-right">408</div>
          </div>
        </div>

      </div>

      {/* Main Bar Chart */}
      <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[13px] font-bold text-gray-700">STUDENT STRENGTH STANDARD WISE</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <div className="w-3 h-3 bg-[#a5b1c2]"></div> Total Students
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <div className="w-3 h-3 bg-[#00a8e8]"></div> New Admission
            </div>
          </div>
        </div>
        
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={strengthData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <RechartsTooltip />
              <Bar dataKey="total" fill="#a5b1c2" barSize={20} radius={[2, 2, 0, 0]}>
                {strengthData.map((entry, index) => (
                  <cell key={`cell-${index}`} fill="#a5b1c2" />
                ))}
              </Bar>
              <Bar dataKey="new" fill="#00a8e8" barSize={20} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center text-[10px] font-bold text-gray-500 mt-2">STANDARD</div>
      </div>

      {/* Two charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Comparison Bar Chart */}
        <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
          <h3 className="text-[13px] font-bold text-gray-700 mb-6">STUDENT STATISTICS COMPARISON WITH PREVIOUS YEAR</h3>
          <div className="flex justify-end gap-4 mb-4">
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <div className="w-3 h-3 bg-[#a5b1c2]"></div> 2026-2027
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <div className="w-3 h-3 bg-[#ff5252]"></div> 2025-2026
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparisonData}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} angle={-30} textAnchor="end" />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <RechartsTooltip />
                <Bar dataKey="curr" fill="#a5b1c2" barSize={15} radius={[2, 2, 0, 0]} />
                <Bar dataKey="prev" fill="#ff5252" barSize={15} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-[10px] font-bold text-gray-500 mt-2">COMPARISON VALUES</div>
        </div>

        {/* New Admission In Donut */}
        <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[13px] font-bold text-gray-700">NEW ADMISSION IN</h3>
            <div className="flex bg-gray-100 rounded overflow-hidden">
              <button className="px-3 py-1 bg-[#4db7e2] text-white text-[10px] font-bold">LAST 7 DAYS</button>
              <button className="px-3 py-1 text-gray-600 text-[10px] font-bold hover:bg-gray-200 transition">LAST 15 DAYS</button>
              <button className="px-3 py-1 text-gray-600 text-[10px] font-bold hover:bg-gray-200 transition">LAST 30 DAYS</button>
            </div>
          </div>
          
          <div className="text-center text-xs text-gray-500 mb-2">17-AUG-2026 TO 24-AUG-2026</div>
          <div className="flex">
            <div className="w-2/3 h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={newAdmission7Days}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    {newAdmission7Days.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-5xl font-black text-gray-800">1</span>
              </div>
            </div>
            
            <div className="w-1/3 flex flex-col justify-center gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-3 h-3 bg-[#00a8e8]"></div> Boys
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-3 h-3 bg-[#ff5252]"></div> Girls
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Standard Wise & Religion Wise Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Standard Wise Donut */}
        <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-[13px] font-bold text-gray-700">STANDARD WISE STATISTICS</h3>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[11px] text-gray-600">
                <div className="w-3 h-3 bg-[#00a8e8]"></div> TC Taken
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-600">
                <div className="w-3 h-3 bg-[#fbc02d]"></div> New Admission
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-600">
                <div className="w-3 h-3 bg-[#ff9800]"></div> Old
              </div>
            </div>
          </div>
          
          <div className="text-center font-bold text-gray-700 mb-2">CLASS NUR</div>
          <div className="flex justify-center gap-4 text-xs text-gray-600 mb-2">
            <span className="flex items-center gap-1"><FaMale className="text-gray-400" /> Boys 30</span>
            <span className="flex items-center gap-1"><FaFemale className="text-red-400" /> Girls 16</span>
          </div>

          <div className="h-56 relative flex items-center justify-center">
             <div className="absolute left-0 cursor-pointer text-gray-400 hover:text-gray-600 text-xl font-bold">&larr;</div>
             
             <div className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={standardWiseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {standardWiseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-4xl font-black text-gray-800">46</span>
                </div>
             </div>
             
             <div className="absolute right-0 cursor-pointer text-gray-400 hover:text-gray-600 text-xl font-bold">&rarr;</div>
          </div>
        </div>

        {/* Religion Wise Donut */}
        <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-[13px] font-bold text-gray-700">RELIGION WISE STUDENT STRENGTH</h3>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[10px] text-gray-600"><div className="w-2 h-2 bg-[#d9534f]"></div> NA</div>
              <div className="flex items-center gap-2 text-[10px] text-gray-600"><div className="w-2 h-2 bg-[#fbc02d]"></div> MUSLIM</div>
              <div className="flex items-center gap-2 text-[10px] text-gray-600"><div className="w-2 h-2 bg-[#f0ad4e]"></div> HINDU</div>
              <div className="flex items-center gap-2 text-[10px] text-gray-600"><div className="w-2 h-2 bg-[#5cb85c]"></div> O.B.C.</div>
              <div className="flex items-center gap-2 text-[10px] text-gray-600"><div className="w-2 h-2 bg-[#5bc0de]"></div> SELECT CASTE CATEGORY</div>
              <div className="flex items-center gap-2 text-[10px] text-gray-600"><div className="w-2 h-2 bg-[#337ab7]"></div> S.C.</div>
              <div className="flex items-center gap-2 text-[10px] text-gray-600"><div className="w-2 h-2 bg-[#c9302c]"></div> GENERAL</div>
              <div className="flex items-center gap-2 text-[10px] text-gray-600"><div className="w-2 h-2 bg-[#e05d6f]"></div> S.T.</div>
            </div>
          </div>
          
          <div className="h-64 relative -mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={religionData.filter(d => d.value > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={1}
                  dataKey="value"
                  stroke="none"
                >
                  {religionData.filter(d => d.value > 0).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-4">
              <span className="text-4xl font-black text-gray-800">1236</span>
            </div>
          </div>
        </div>

      </div>

      {/* TC & Category Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* TC Statistics */}
        <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-[13px] font-bold text-gray-700">TRANSFER CERTIFICATE STATISTICS</h3>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[11px] text-gray-600"><div className="w-3 h-3 bg-[#5bc0de]"></div> Drafted</div>
              <div className="flex items-center gap-2 text-[11px] text-gray-600"><div className="w-3 h-3 bg-[#d9534f]"></div> Generated</div>
              <div className="flex items-center gap-2 text-[11px] text-gray-600"><div className="w-3 h-3 bg-[#f0ad4e]"></div> Cancelled</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center h-40">
            <div className="text-gray-500 font-bold">NaN%</div>
          </div>
        </div>

        {/* Category Statistics */}
        <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-[13px] font-bold text-gray-700">CATEGORY WISE STUDENT STATISTICS</h3>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[11px] text-gray-600"><div className="w-3 h-3 bg-[#d9534f]"></div> NA</div>
              <div className="flex items-center gap-2 text-[11px] text-gray-600"><div className="w-3 h-3 bg-[#d9534f]"></div> Gen</div>
              <div className="flex items-center gap-2 text-[11px] text-gray-600"><div className="w-3 h-3 bg-[#f0ad4e]"></div> OBC</div>
              <div className="flex items-center gap-2 text-[11px] text-gray-600"><div className="w-3 h-3 bg-[#5cb85c]"></div> SC</div>
            </div>
          </div>
          
          <div className="h-56 relative -mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={80}
                  paddingAngle={1}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-4">
              <span className="text-3xl font-black text-gray-800">1236</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default AdmissionDashboard;
