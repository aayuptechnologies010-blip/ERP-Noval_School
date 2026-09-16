import React, { useState, useEffect } from 'react';
import { FaMale, FaFemale, FaRegBuilding, FaGlobe, FaChevronLeft, FaChevronRight, FaSpinner } from 'react-icons/fa';


const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function AdmissionDashboard() {
  // Active Tab for "NEW ADMISSION IN"
  const [admissionDaysTab, setAdmissionDaysTab] = useState('7'); // '7', '15', '30'

  // Standard wise statistics class switcher
  const classList = ['NUR', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const [selectedClassIndex, setSelectedClassIndex] = useState(0);
  const currentClass = classList[selectedClassIndex];

  const handlePrevClass = () => {
    setSelectedClassIndex((prev) => (prev > 0 ? prev - 1 : classList.length - 1));
  };

  const handleNextClass = () => {
    setSelectedClassIndex((prev) => (prev < classList.length - 1 ? prev + 1 : 0));
  };

  // Dynamic state loaded strictly from backend / MongoDB
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch real statistics from Express backend
  const fetchDashboardStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/dashboard/admission-stats?days=${admissionDaysTab}&standard=${currentClass}`);
      if (res.ok) {
        const data = await res.json();
        setDashboardData(data);
      }
    } catch (err) {
      console.error('Failed to load real admission stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, [admissionDaysTab, currentClass]);

  // Helper function to calculate SVG donut slices
  const getDonutSlicePath = (cx, cy, rOuter, rInner, startDeg, endDeg) => {
    if (endDeg - startDeg >= 360) endDeg = startDeg + 359.99;
    const toRad = (d) => ((d - 90) * Math.PI) / 180;
    const s = toRad(startDeg);
    const e = toRad(endDeg);
    const x1 = cx + rOuter * Math.cos(s);
    const y1 = cy + rOuter * Math.sin(s);
    const x2 = cx + rOuter * Math.cos(e);
    const y2 = cy + rOuter * Math.sin(e);
    const x3 = cx + rInner * Math.cos(e);
    const y3 = cy + rInner * Math.sin(e);
    const x4 = cx + rInner * Math.cos(s);
    const y4 = cy + rInner * Math.sin(s);
    const largeArc = (endDeg - startDeg) > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  };

  // Real data strictly from backend (0 fallbacks, no hardcoded dummy counts)
  const headCount = dashboardData?.headCount || {
    total: 0,
    boys: 0,
    boysPercent: 0,
    girls: 0,
    girlsPercent: 0,
  };

  const newAdmStats = dashboardData?.newAdmissionStats || {
    total: 0,
    schoolReg: 0,
    schoolRegPercent: 0,
    onlineReg: 0,
    onlineRegPercent: 0,
  };

  const newAdmRatio = dashboardData?.newAdmissionRatioVsPrevYear || {
    boys: { current: 0, previous: 0, changePercent: '0.00' },
    girls: { current: 0, previous: 0, changePercent: '0.00' },
  };

  const studentStatsRatio = dashboardData?.studentStatsVsPrevYear || {
    boys: { current: 0, previous: 0, changePercent: '0.00' },
    girls: { current: 0, previous: 0, changePercent: '0.00' },
  };

  const standardWiseStrength = dashboardData?.standardWiseStrength || classList.map(name => ({ name, total: 0, newAdm: 0 }));

  const comparisonData = dashboardData?.comparisonData || [
    { label: 'TOTAL STUDENT', curr: 0, prev: 0 },
    { label: 'BOYS', curr: 0, prev: 0 },
    { label: 'GIRLS', curr: 0, prev: 0 },
    { label: 'NEW ADMISSION', curr: 0, prev: 0 },
    { label: 'TC TAKEN', curr: 0, prev: 0 },
    { label: 'LEFT', curr: 0, prev: 0 },
  ];

  const newAdmissionByPeriod = dashboardData?.newAdmissionByPeriod || {
    days: parseInt(admissionDaysTab),
    dateRangeLabel: 'RECENT ADMISSIONS',
    total: 0,
    boys: 0,
    boysPercent: 0,
    girls: 0,
    girlsPercent: 0,
  };

  const currentClassStats = dashboardData?.standardWiseStats || {
    class: currentClass,
    total: 0,
    boys: 0,
    girls: 0,
    newAdmission: 0,
    newAdmissionPercent: 0,
    old: 0,
    oldPercent: 0,
    tcTaken: 0,
  };

  const religionStats = dashboardData?.religionWiseStats || [];
  const categoryStats = dashboardData?.categoryWiseStats || [];

  const tcStats = dashboardData?.tcStats || {
    total: 0,
    drafted: 0,
    draftedPercent: 0,
    generated: 0,
    generatedPercent: 0,
    cancelled: 0,
    cancelledPercent: 0,
  };

  // Dynamic max scales based strictly on real values
  const maxStandardVal = Math.max(10, ...standardWiseStrength.map((s) => Math.max(s.total, s.newAdm)));
  const maxCompVal = Math.max(10, ...comparisonData.map((c) => Math.max(c.curr, c.prev)));

  return (
    <div className="flex flex-col gap-5 pb-10 select-none font-sans text-gray-800 relative">
      
      {/* Real-time Indicator banner */}
      <div className="flex items-center justify-between px-4 py-2 bg-sky-50 border border-sky-200 rounded text-xs text-sky-800 font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
          <span>Live Database Mode: <strong>{headCount.total} Students</strong> & <strong>{tcStats.total} TCs</strong> fetched directly from MongoDB</span>
        </div>
        {loading && (
          <div className="flex items-center gap-1.5 text-sky-600">
            <FaSpinner className="animate-spin text-xs" />
            <span>Syncing database...</span>
          </div>
        )}
      </div>

      {/* -------------------- ROW 1: TOP 4 STAT CARDS -------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: STUDENT HEAD COUNT (YTD) */}
        <div className="bg-white p-5 rounded border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <h3 className="text-xs font-bold text-gray-700 text-center tracking-tight uppercase">
            STUDENT HEAD COUNT <span className="font-semibold text-gray-500">(YTD)</span>
          </h3>
          <div className="text-center text-gray-700 text-sm my-3">
            Total: <span className="font-extrabold text-xl text-gray-950">{headCount.total}</span>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs text-gray-700 font-medium mb-1">
                <span className="flex items-center gap-1.5"><FaMale className="text-gray-400 text-base" /> Boys</span>
                <span className="font-bold text-gray-900">{headCount.boys} ({headCount.boysPercent}%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#94a3b8] h-full rounded-full transition-all duration-700" 
                  style={{ width: `${headCount.boysPercent}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-gray-700 font-medium mb-1">
                <span className="flex items-center gap-1.5"><FaFemale className="text-[#ff6b6b] text-base" /> Girls</span>
                <span className="font-bold text-gray-900">{headCount.girls} ({headCount.girlsPercent}%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#ff6b6b] h-full rounded-full transition-all duration-700" 
                  style={{ width: `${headCount.girlsPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: NEW ADMISSION STATISTICS */}
        <div className="bg-white p-5 rounded border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <h3 className="text-xs font-bold text-gray-700 text-center tracking-tight uppercase">
            NEW ADMISSION STATISTICS
          </h3>
          <div className="text-center text-gray-700 text-sm my-3">
            Total: <span className="font-extrabold text-xl text-gray-950">{newAdmStats.total}</span>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs text-gray-700 font-medium mb-1">
                <span className="flex items-center gap-1.5 text-amber-800"><FaRegBuilding className="text-amber-500 text-sm" /> Reg. at school</span>
                <span className="font-bold text-gray-900">{newAdmStats.schoolReg} ({newAdmStats.schoolRegPercent}%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#f59e0b] h-full rounded-full transition-all duration-700" 
                  style={{ width: `${newAdmStats.schoolRegPercent}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-gray-700 font-medium mb-1">
                <span className="flex items-center gap-1.5 text-blue-700"><FaGlobe className="text-[#00a2db] text-sm" /> Online Reg.</span>
                <span className="font-bold text-gray-900">{newAdmStats.onlineReg} ({newAdmStats.onlineRegPercent}%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#00a2db] h-full rounded-full" 
                  style={{ width: `${newAdmStats.onlineRegPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: NEW ADMISSION RATIO (VS.PREV YEAR) */}
        <div className="bg-white p-5 rounded border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <h3 className="text-xs font-bold text-gray-700 text-center tracking-tight uppercase">
            NEW ADMISSION RATIO <span className="font-semibold text-gray-500 text-[10px]">(VS.PREV YEAR)</span>
          </h3>
          
          <div className="flex justify-end gap-5 text-[10px] font-bold text-gray-500 mt-2 mb-1">
            <span>THIS YEAR</span>
            <span>PREV YEAR</span>
          </div>
          
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-gray-700 font-medium"><FaMale className="text-gray-400 text-base" /> Boys</span>
              <span className="font-bold text-gray-900 text-sm">
                {newAdmRatio.boys.current} ({Number(newAdmRatio.boys.changePercent) > 0 ? '+' : ''}{newAdmRatio.boys.changePercent}%)
              </span>
              <span className="font-semibold text-gray-800 text-sm w-12 text-right">{newAdmRatio.boys.previous}</span>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-gray-700 font-medium"><FaFemale className="text-[#ff6b6b] text-base" /> Girls</span>
              <span className="font-bold text-gray-900 text-sm">
                {newAdmRatio.girls.current} ({Number(newAdmRatio.girls.changePercent) > 0 ? '+' : ''}{newAdmRatio.girls.changePercent}%)
              </span>
              <span className="font-semibold text-gray-800 text-sm w-12 text-right">{newAdmRatio.girls.previous}</span>
            </div>
          </div>
        </div>

        {/* Card 4: STUDENT STATISTICS (VS.PREV YEAR) */}
        <div className="bg-white p-5 rounded border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <h3 className="text-xs font-bold text-gray-700 text-center tracking-tight uppercase">
            STUDENT STATISTICS <span className="font-semibold text-gray-500 text-[10px]">(VS.PREV YEAR)</span>
          </h3>
          
          <div className="flex justify-end gap-5 text-[10px] font-bold text-gray-500 mt-2 mb-1">
            <span>THIS YEAR</span>
            <span>PREV YEAR</span>
          </div>
          
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-gray-700 font-medium"><FaMale className="text-gray-400 text-base" /> Boys</span>
              <span className="font-bold text-gray-900 text-sm">
                {studentStatsRatio.boys.current} ({Number(studentStatsRatio.boys.changePercent) > 0 ? '+' : ''}{studentStatsRatio.boys.changePercent}%)
              </span>
              <span className="font-semibold text-gray-800 text-sm w-12 text-right">{studentStatsRatio.boys.previous}</span>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-gray-700 font-medium"><FaFemale className="text-[#ff6b6b] text-base" /> Girls</span>
              <span className="font-bold text-gray-900 text-sm">
                {studentStatsRatio.girls.current} ({Number(studentStatsRatio.girls.changePercent) > 0 ? '+' : ''}{studentStatsRatio.girls.changePercent}%)
              </span>
              <span className="font-semibold text-gray-800 text-sm w-12 text-right">{studentStatsRatio.girls.previous}</span>
            </div>
          </div>
        </div>

      </div>

      {/* -------------------- ROW 2: STUDENT STRENGTH STANDARD WISE (DUAL BAR CHART) -------------------- */}
      <div className="bg-white p-5 rounded border border-gray-200/90 shadow-2xs">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-bold text-gray-800 tracking-tight uppercase">
            STUDENT STRENGTH STANDARD WISE
          </h3>
          <div className="flex items-center gap-6 text-xs text-gray-700 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-[#c5d3e8] inline-block rounded-2xs"></span>
              <span>Total Students</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-[#00a2db] inline-block rounded-2xs"></span>
              <span>New Admission</span>
            </div>
          </div>
        </div>

        {/* SVG Dual Bar Chart with Real Values on Top */}
        <div className="w-full flex justify-center items-center py-2 overflow-x-auto">
          <svg viewBox="0 0 1060 260" className="w-full min-w-[900px] h-[260px] select-none">
            {/* Y Axis Label */}
            <text
              x="-110"
              y="22"
              transform="rotate(-90)"
              textAnchor="middle"
              fill="#64748b"
              fontSize="11"
              fontWeight="700"
              fontFamily="sans-serif"
            >
              NO. OF STUDENTS
            </text>

            {/* Y-Axis Grid Lines & Ticks */}
            {[
              { val: String(maxStandardVal), y: 20 },
              { val: String(Math.round(maxStandardVal * 0.8)), y: 56 },
              { val: String(Math.round(maxStandardVal * 0.6)), y: 92 },
              { val: String(Math.round(maxStandardVal * 0.4)), y: 128 },
              { val: String(Math.round(maxStandardVal * 0.2)), y: 164 },
              { val: '0', y: 200 },
            ].map((tick) => (
              <g key={tick.y}>
                <text x="62" y={tick.y + 4} textAnchor="end" fill="#64748b" fontSize="10" fontWeight="500">
                  {tick.val}
                </text>
                <line x1="66" y1={tick.y} x2="70" y2={tick.y} stroke="#cbd5e1" strokeWidth="1" />
                <line x1="70" y1={tick.y} x2="1045" y2={tick.y} stroke={tick.val === '0' ? '#94a3b8' : '#f1f5f9'} strokeWidth="1" />
              </g>
            ))}

            {/* Dual Bars for Each Standard */}
            {standardWiseStrength.map((item, idx) => {
              const groupX = 90 + idx * 63;
              const totalH = maxStandardVal > 0 ? Math.min(180, (item.total / maxStandardVal) * 180) : 0;
              const totalY = 200 - totalH;
              const newH = maxStandardVal > 0 ? Math.min(180, (item.newAdm / maxStandardVal) * 180) : 0;
              const newY = 200 - newH;

              return (
                <g key={item.name} className="animate-bar-grow">
                  {/* Total Bar */}
                  <rect
                    x={groupX}
                    y={totalY}
                    width="23"
                    height={totalH}
                    fill="#c5d3e8"
                    rx="1.5"
                    className="hover:opacity-90 transition-opacity"
                  />
                  {/* Number on top of Total Bar */}
                  <text
                    x={groupX + 11.5}
                    y={totalY - 4}
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="9.5"
                    fontWeight="600"
                  >
                    {item.total}
                  </text>

                  {/* New Admission Bar */}
                  {item.newAdm > 0 && (
                    <>
                      <rect
                        x={groupX + 24}
                        y={newY}
                        width="23"
                        height={newH}
                        fill="#00a2db"
                        rx="1.5"
                        className="hover:opacity-90 transition-opacity"
                      />
                      <text
                        x={groupX + 35.5}
                        y={newY - 4}
                        textAnchor="middle"
                        fill="#0284c7"
                        fontSize="9.5"
                        fontWeight="600"
                      >
                        {item.newAdm}
                      </text>
                    </>
                  )}
                  {item.newAdm === 0 && (
                    <text
                      x={groupX + 35.5}
                      y="195"
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="9.5"
                      fontWeight="600"
                    >
                      0
                    </text>
                  )}

                  {/* X Axis Standard Label */}
                  <text
                    x={groupX + 23}
                    y="218"
                    textAnchor="middle"
                    fill="#475569"
                    fontSize="11"
                    fontWeight="600"
                  >
                    {item.name}
                  </text>
                </g>
              );
            })}

            {/* X Axis Bottom Label */}
            <text
              x="557"
              y="245"
              textAnchor="middle"
              fill="#475569"
              fontSize="11"
              fontWeight="700"
              fontFamily="sans-serif"
              letterSpacing="1"
            >
              STANDARD
            </text>
          </svg>
        </div>
      </div>

      {/* -------------------- ROW 3: COMPARISON & NEW ADMISSION IN PERIOD -------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Left: STUDENT STATISTICS COMPARISON WITH PREVIOUS YEAR */}
        <div className="bg-white p-5 rounded border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-bold text-gray-800 tracking-tight uppercase">
              STUDENT STATISTICS COMPARISON WITH PREVIOUS YEAR
            </h3>
            <div className="flex items-center gap-4 text-xs text-gray-700 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 bg-[#c5d3e8] inline-block rounded-2xs"></span>
                <span>2026-2027</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 bg-[#ff6b6b] inline-block rounded-2xs"></span>
                <span>2025-2026</span>
              </div>
            </div>
          </div>

          {/* SVG Comparison Bar Chart */}
          <div className="w-full flex justify-center items-center py-2">
            <svg viewBox="0 0 520 250" className="w-full h-[250px] select-none">
              {/* Y Axis Label */}
              <text
                x="-100"
                y="18"
                transform="rotate(-90)"
                textAnchor="middle"
                fill="#64748b"
                fontSize="10"
                fontWeight="700"
              >
                NO. OF STUDENTS
              </text>

              {/* Y Ticks */}
              {[
                { val: String(maxCompVal), y: 20 },
                { val: String(Math.round(maxCompVal * 0.85)), y: 44 },
                { val: String(Math.round(maxCompVal * 0.71)), y: 68 },
                { val: String(Math.round(maxCompVal * 0.57)), y: 92 },
                { val: String(Math.round(maxCompVal * 0.43)), y: 116 },
                { val: String(Math.round(maxCompVal * 0.28)), y: 140 },
                { val: String(Math.round(maxCompVal * 0.14)), y: 164 },
                { val: '0', y: 188 },
              ].map((tick) => (
                <g key={tick.y}>
                  <text x="50" y={tick.y + 4} textAnchor="end" fill="#64748b" fontSize="9" fontWeight="500">
                    {tick.val}
                  </text>
                  <line x1="54" y1={tick.y} x2="510" y2={tick.y} stroke={tick.val === '0' ? '#94a3b8' : '#f1f5f9'} strokeWidth="1" />
                </g>
              ))}

              {/* Bars */}
              {comparisonData.map((item, idx) => {
                const groupX = 70 + idx * 72;
                const currH = maxCompVal > 0 ? Math.min(168, (item.curr / maxCompVal) * 168) : 0;
                const currY = 188 - currH;
                const prevH = maxCompVal > 0 ? Math.min(168, (item.prev / maxCompVal) * 168) : 0;
                const prevY = 188 - prevH;

                return (
                  <g key={item.label} className="animate-bar-grow">
                    {/* 2026-2027 Bar */}
                    <rect x={groupX} y={currY} width="20" height={currH} fill="#c5d3e8" rx="1.5" />
                    <text x={groupX + 10} y={currY - 3} textAnchor="middle" fill="#64748b" fontSize="8.5" fontWeight="600">
                      {item.curr}
                    </text>

                    {/* 2025-2026 Bar */}
                    <rect x={groupX + 21} y={prevY} width="20" height={prevH} fill="#ff6b6b" rx="1.5" />
                    <text x={groupX + 31} y={prevY - 3} textAnchor="middle" fill="#e11d48" fontSize="8.5" fontWeight="600">
                      {item.prev}
                    </text>

                    {/* Rotated X Label */}
                    <text
                      x={groupX + 20}
                      y="198"
                      transform={`rotate(-40 ${groupX + 20} 198)`}
                      textAnchor="end"
                      fill="#475569"
                      fontSize="8.5"
                      fontWeight="600"
                    >
                      {item.label}
                    </text>
                  </g>
                );
              })}

              <text x="270" y="244" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="700" letterSpacing="0.5">
                COMPARISON VALUES
              </text>
            </svg>
          </div>
        </div>

        {/* Right: NEW ADMISSION IN (7 / 15 / 30 DAYS) */}
        <div className="bg-white p-5 rounded border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h3 className="text-xs font-bold text-gray-800 tracking-tight uppercase">
              NEW ADMISSION IN
            </h3>
            <div className="flex border border-gray-200 rounded overflow-hidden text-[11px] font-bold">
              <button
                onClick={() => setAdmissionDaysTab('7')}
                className={`px-3 py-1.5 transition-colors cursor-pointer ${
                  admissionDaysTab === '7' ? 'bg-[#00a2db] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                LAST 7 DAYS
              </button>
              <button
                onClick={() => setAdmissionDaysTab('15')}
                className={`px-3 py-1.5 transition-colors border-l border-gray-200 cursor-pointer ${
                  admissionDaysTab === '15' ? 'bg-[#00a2db] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                LAST 15 DAYS
              </button>
              <button
                onClick={() => setAdmissionDaysTab('30')}
                className={`px-3 py-1.5 transition-colors border-l border-gray-200 cursor-pointer ${
                  admissionDaysTab === '30' ? 'bg-[#00a2db] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                LAST 30 DAYS
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-gray-600 font-semibold my-1">
            {newAdmissionByPeriod.dateRangeLabel}
          </div>

          <div className="flex items-center justify-between">
            {/* SVG Donut Chart with Leader Lines */}
            <div className="flex-1 flex justify-center items-center">
              <svg viewBox="0 0 280 240" className="w-[260px] h-[230px] select-none overflow-visible">
                {/* Donut Ring */}
                <g className="animate-donut-spin" style={{ transformOrigin: '140px 120px' }}>
                  {newAdmissionByPeriod.total === 0 ? (
                    <circle cx="140" cy="120" r="75" fill="none" stroke="#e2e8f0" strokeWidth="36" />
                  ) : newAdmissionByPeriod.boysPercent === 100 ? (
                    <circle cx="140" cy="120" r="75" fill="none" stroke="#00a2db" strokeWidth="36" />
                  ) : newAdmissionByPeriod.girlsPercent === 100 ? (
                    <circle cx="140" cy="120" r="75" fill="none" stroke="#ff7675" strokeWidth="36" />
                  ) : (
                    <>
                      <path
                        d={getDonutSlicePath(140, 120, 93, 57, 0, (newAdmissionByPeriod.boysPercent / 100) * 360)}
                        fill="#00a2db"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                      <path
                        d={getDonutSlicePath(140, 120, 93, 57, (newAdmissionByPeriod.boysPercent / 100) * 360, 360)}
                        fill="#ff7675"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                    </>
                  )}
                </g>

                {/* Center Counter */}
                <g className="animate-center-pop" style={{ transformOrigin: '140px 120px' }}>
                  <circle cx="140" cy="120" r="54" fill="#ffffff" />
                  <text x="140" y="140" textAnchor="middle" fill="#000000" style={{ fontSize: '64px', fontWeight: '900' }}>
                    {newAdmissionByPeriod.total}
                  </text>
                </g>

                {/* Leader Lines & Percentages */}
                {newAdmissionByPeriod.total > 0 && (
                  <g className="animate-leader-lines">
                    <line x1="140" y1="45" x2="140" y2="28" stroke="#00a2db" strokeWidth="1" />
                    <text x="140" y="22" textAnchor="middle" fill="#000000" fontSize="13" fontWeight="600">
                      {newAdmissionByPeriod.girlsPercent}%
                    </text>

                    <line x1="140" y1="195" x2="140" y2="212" stroke="#00a2db" strokeWidth="1" />
                    <text x="140" y="228" textAnchor="middle" fill="#000000" fontSize="13" fontWeight="600">
                      {newAdmissionByPeriod.boysPercent}%
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Right Legend */}
            <div className="flex flex-col gap-2.5 text-xs text-gray-700 font-medium pr-6">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-[#00a2db] inline-block rounded-2xs"></span>
                <span>Boys ({newAdmissionByPeriod.boys})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-[#ff7675] inline-block rounded-2xs"></span>
                <span>Girls ({newAdmissionByPeriod.girls})</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* -------------------- ROW 4: STANDARD WISE & RELIGION WISE -------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Left: STANDARD WISE STATISTICS (With Class Switcher & Exact Donut) */}
        <div className="bg-white p-5 rounded border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs font-bold text-gray-800 tracking-tight uppercase">
              STANDARD WISE STATISTICS
            </h3>
            <div className="flex flex-col gap-1.5 text-[11px] text-gray-700 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#00a2db] inline-block rounded-2xs"></span>
                <span>TC Taken ({currentClassStats.tcTaken || 0})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#fbc531] inline-block rounded-2xs"></span>
                <span>New Admission ({currentClassStats.newAdmission})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#e67e22] inline-block rounded-2xs"></span>
                <span>Old ({currentClassStats.old})</span>
              </div>
            </div>
          </div>

          {/* Sub Stats: CLASS & Boys / Girls */}
          <div className="text-center">
            <div className="font-bold text-gray-900 text-sm">CLASS {currentClass}</div>
            <div className="flex justify-center gap-5 text-xs text-gray-700 font-medium mt-0.5">
              <span className="flex items-center gap-1"><FaMale className="text-gray-400 text-sm" /> Boys {currentClassStats.boys}</span>
              <span className="flex items-center gap-1"><FaFemale className="text-[#ff6b6b] text-sm" /> Girls {currentClassStats.girls}</span>
            </div>
          </div>

          {/* Donut Chart with Left/Right Arrows */}
          <div className="flex items-center justify-between py-2">
            <button
              onClick={handlePrevClass}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              title="Previous Class"
            >
              <FaChevronLeft className="text-base" />
            </button>

            <svg viewBox="0 0 280 230" className="w-[260px] h-[220px] select-none overflow-visible">
              <g className="animate-donut-spin" style={{ transformOrigin: '140px 115px' }}>
                {currentClassStats.total === 0 ? (
                  <circle cx="140" cy="115" r="56" fill="none" stroke="#e2e8f0" strokeWidth="32" />
                ) : (
                  (() => {
                    const newPercent = currentClassStats.newAdmissionPercent || 0;
                    const newDeg = (newPercent / 100) * 360;

                    return (
                      <>
                        {newPercent > 0 && (
                          <path
                            d={getDonutSlicePath(140, 115, 72, 40, 0, newDeg)}
                            fill="#fbc531"
                            stroke="#ffffff"
                            strokeWidth="2"
                          />
                        )}
                        {newPercent < 100 && (
                          <path
                            d={getDonutSlicePath(140, 115, 72, 40, newDeg, 360)}
                            fill="#e67e22"
                            stroke="#ffffff"
                            strokeWidth="2"
                          />
                        )}
                      </>
                    );
                  })()
                )}
              </g>

              {/* Center Counter */}
              <g className="animate-center-pop" style={{ transformOrigin: '140px 115px' }}>
                <circle cx="140" cy="115" r="39" fill="#ffffff" />
                <text x="140" y="132" textAnchor="middle" fill="#000000" style={{ fontSize: '48px', fontWeight: '900' }}>
                  {currentClassStats.total}
                </text>
              </g>

              {/* Leader Lines & Percentages */}
              {currentClassStats.total > 0 && (
                <g className="animate-leader-lines">
                  <line x1="140" y1="43" x2="140" y2="28" stroke="#e67e22" strokeWidth="0.9" />
                  <text x="140" y="22" textAnchor="middle" fill="#000000" fontSize="12" fontWeight="600">
                    {currentClassStats.oldPercent}%
                  </text>

                  <line x1="140" y1="187" x2="145" y2="202" stroke="#fbc531" strokeWidth="0.9" />
                  <text x="148" y="216" textAnchor="middle" fill="#000000" fontSize="12" fontWeight="600">
                    {currentClassStats.newAdmissionPercent}%
                  </text>
                </g>
              )}
            </svg>

            <button
              onClick={handleNextClass}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              title="Next Class"
            >
              <FaChevronRight className="text-base" />
            </button>
          </div>
        </div>

        {/* Right: RELIGION WISE STUDENT STRENGTH */}
        <div className="bg-white p-5 rounded border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs font-bold text-gray-800 tracking-tight uppercase">
              RELIGION WISE STUDENT STRENGTH
            </h3>
            <div className="flex flex-col gap-1 text-[10px] text-gray-700 font-medium">
              {religionStats.length === 0 ? (
                <span className="text-gray-400">No records</span>
              ) : (
                religionStats.map((r) => (
                  <div key={r.name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 inline-block rounded-2xs" style={{ backgroundColor: r.color }}></span>
                    <span>{r.name} ({r.count})</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-center items-center py-2">
            <svg viewBox="0 0 320 240" className="w-[300px] h-[230px] select-none overflow-visible">
              {/* Donut Slices */}
              <g className="animate-donut-spin" style={{ transformOrigin: '160px 120px' }}>
                {religionStats.length === 0 ? (
                  <circle cx="160" cy="120" r="58" fill="none" stroke="#e2e8f0" strokeWidth="33" />
                ) : (
                  (() => {
                    let currentAngle = 0;
                    return religionStats.map((r) => {
                      const sliceAngle = (r.percent / 100) * 360;
                      if (sliceAngle <= 0) return null;
                      const path = getDonutSlicePath(160, 120, 75, 42, currentAngle, currentAngle + sliceAngle);
                      currentAngle += sliceAngle;
                      return (
                        <path
                          key={r.name}
                          d={path}
                          fill={r.color}
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                      );
                    });
                  })()
                )}
              </g>

              {/* Center Counter */}
              <g className="animate-center-pop" style={{ transformOrigin: '160px 120px' }}>
                <circle cx="160" cy="120" r="41" fill="#ffffff" />
                <text x="160" y="137" textAnchor="middle" fill="#000000" style={{ fontSize: '46px', fontWeight: '900' }}>
                  {headCount.total}
                </text>
              </g>

              {/* Leader Lines for top religion items */}
              {religionStats.length > 0 && (
                <g className="animate-leader-lines">
                  <line x1="160" y1="195" x2="152" y2="210" stroke="#fbc531" strokeWidth="0.9" />
                  <text x="148" y="224" textAnchor="middle" fill="#000000" fontSize="12" fontWeight="600">
                    {religionStats[0]?.percent || 0}%
                  </text>

                  {religionStats[1] && (
                    <>
                      <line x1="102" y1="168" x2="88" y2="178" stroke={religionStats[1].color} strokeWidth="0.9" />
                      <text x="82" y="184" textAnchor="end" fill="#000000" fontSize="12" fontWeight="600">
                        {religionStats[1].percent}%
                      </text>
                    </>
                  )}
                </g>
              )}
            </svg>
          </div>
        </div>

      </div>

      {/* -------------------- ROW 5: TC & CATEGORY -------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Left: TRANSFER CERTIFICATE STATISTICS */}
        <div className="bg-white p-5 rounded border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs font-bold text-gray-800 tracking-tight uppercase">
              TRANSFER CERTIFICATE STATISTICS
            </h3>
            <div className="flex flex-col gap-1.5 text-[11px] text-gray-700 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#00a2db] inline-block rounded-2xs"></span>
                <span>Drafted ({tcStats.drafted}) - {tcStats.draftedPercent}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#ff7675] inline-block rounded-2xs"></span>
                <span>Generated ({tcStats.generated}) - {tcStats.generatedPercent}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#fbc531] inline-block rounded-2xs"></span>
                <span>Cancelled ({tcStats.cancelled}) - {tcStats.cancelledPercent}%</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center py-2">
            <svg viewBox="0 0 280 230" className="w-[260px] h-[220px] select-none overflow-visible">
              <g className="animate-donut-spin" style={{ transformOrigin: '140px 115px' }}>
                {tcStats.total === 0 ? (
                  <circle cx="140" cy="115" r="56" fill="none" stroke="#e2e8f0" strokeWidth="24" />
                ) : (
                  (() => {
                    let currentAngle = 0;
                    const slices = [
                      { percent: tcStats.generatedPercent, color: '#ff7675' },
                      { percent: tcStats.draftedPercent, color: '#00a2db' },
                      { percent: tcStats.cancelledPercent, color: '#fbc531' },
                    ];

                    return slices.map((s, idx) => {
                      const sliceAngle = (s.percent / 100) * 360;
                      if (sliceAngle <= 0) return null;
                      const path = getDonutSlicePath(140, 115, 72, 40, currentAngle, currentAngle + sliceAngle);
                      currentAngle += sliceAngle;
                      return (
                        <path
                          key={idx}
                          d={path}
                          fill={s.color}
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                      );
                    });
                  })()
                )}
              </g>

              {/* Center Counter */}
              <g className="animate-center-pop" style={{ transformOrigin: '140px 115px' }}>
                <circle cx="140" cy="115" r="39" fill="#ffffff" />
                <text x="140" y="128" textAnchor="middle" fill="#000000" style={{ fontSize: '42px', fontWeight: '900' }}>
                  {tcStats.total}
                </text>
                <text x="140" y="142" textAnchor="middle" fill="#64748b" style={{ fontSize: '10px', fontWeight: '600' }}>
                  TOTAL TCs
                </text>
              </g>

              {/* Leader Lines */}
              {tcStats.total > 0 && (
                <g className="animate-leader-lines">
                  <line x1="140" y1="43" x2="140" y2="28" stroke="#ff7675" strokeWidth="0.9" />
                  <text x="140" y="22" textAnchor="middle" fill="#000000" fontSize="12" fontWeight="600">
                    {tcStats.generatedPercent}%
                  </text>

                  <line x1="140" y1="187" x2="140" y2="202" stroke="#00a2db" strokeWidth="0.9" />
                  <text x="140" y="216" textAnchor="middle" fill="#000000" fontSize="12" fontWeight="600">
                    {tcStats.draftedPercent}%
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Right: CATEGORY WISE STUDENT STATISTICS */}
        <div className="bg-white p-5 rounded border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs font-bold text-gray-800 tracking-tight uppercase">
              CATEGORY WISE STUDENT STATISTICS
            </h3>
            <div className="flex flex-col gap-1.5 text-[11px] text-gray-700 font-medium">
              {categoryStats.length === 0 ? (
                <span className="text-gray-400">No records</span>
              ) : (
                categoryStats.map((c) => (
                  <div key={c.name} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 inline-block rounded-2xs" style={{ backgroundColor: c.color }}></span>
                    <span>{c.name} ({c.count}) - {c.percent}%</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-center items-center py-2">
            <svg viewBox="0 0 280 230" className="w-[260px] h-[220px] select-none overflow-visible">
              {/* Donut Slices */}
              <g className="animate-donut-spin" style={{ transformOrigin: '140px 115px' }}>
                {categoryStats.length === 0 ? (
                  <circle cx="140" cy="115" r="56" fill="none" stroke="#e2e8f0" strokeWidth="32" />
                ) : (
                  (() => {
                    let currentAngle = 0;
                    return categoryStats.map((c) => {
                      const sliceAngle = (c.percent / 100) * 360;
                      if (sliceAngle <= 0) return null;
                      const path = getDonutSlicePath(140, 115, 72, 40, currentAngle, currentAngle + sliceAngle);
                      currentAngle += sliceAngle;
                      return (
                        <path
                          key={c.name}
                          d={path}
                          fill={c.color}
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                      );
                    });
                  })()
                )}
              </g>

              {/* Center Counter */}
              <g className="animate-center-pop" style={{ transformOrigin: '140px 115px' }}>
                <circle cx="140" cy="115" r="39" fill="#ffffff" />
                <text x="140" y="132" textAnchor="middle" fill="#000000" style={{ fontSize: '46px', fontWeight: '900' }}>
                  {headCount.total}
                </text>
              </g>

              {/* Leader Lines */}
              {categoryStats.length > 0 && (
                <g className="animate-leader-lines">
                  <line x1="140" y1="187" x2="140" y2="202" stroke="#d35400" strokeWidth="0.9" />
                  <text x="140" y="216" textAnchor="middle" fill="#000000" fontSize="12" fontWeight="600">
                    {categoryStats[0]?.percent || 0}%
                  </text>

                  {categoryStats[1] && (
                    <>
                      <line x1="135" y1="43" x2="135" y2="28" stroke={categoryStats[1].color} strokeWidth="0.9" />
                      <text x="135" y="22" textAnchor="middle" fill="#000000" fontSize="12" fontWeight="600">
                        {categoryStats[1].percent}%
                      </text>
                    </>
                  )}
                </g>
              )}
            </svg>
          </div>
        </div>

      </div>

    </div>
  );
}
