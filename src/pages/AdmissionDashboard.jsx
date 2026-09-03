import React, { useState } from 'react';
import { FaMale, FaFemale, FaRegBuilding, FaGlobe, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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

  // 1. STUDENT STRENGTH STANDARD WISE Data (Exact Match with Screenshot 2)
  const standardWiseStrength = [
    { name: 'NUR', total: 46, newAdm: 43 },
    { name: 'LKG', total: 51, newAdm: 11 },
    { name: 'UKG', total: 61, newAdm: 11 },
    { name: '1', total: 69, newAdm: 15 },
    { name: '2', total: 80, newAdm: 13 },
    { name: '3', total: 54, newAdm: 9 },
    { name: '4', total: 73, newAdm: 17 },
    { name: '5', total: 48, newAdm: 9 },
    { name: '6', total: 73, newAdm: 22 },
    { name: '7', total: 69, newAdm: 13 },
    { name: '8', total: 73, newAdm: 14 },
    { name: '9', total: 95, newAdm: 45 },
    { name: '10', total: 203, newAdm: 0 },
    { name: '11', total: 123, newAdm: 66 },
    { name: '12', total: 119, newAdm: 1 },
  ];

  // 2. STUDENT STATISTICS COMPARISON WITH PREVIOUS YEAR (Exact Match with Screenshot 3)
  const comparisonData = [
    { label: 'TOTAL STUDENT', curr: 1237, prev: 1057 },
    { label: 'BOYS', curr: 783, prev: 649 },
    { label: 'GIRLS', curr: 454, prev: 408 },
    { label: 'NEW ADMISSION', curr: 289, prev: 466 },
    { label: 'TC TAKEN', curr: 0, prev: 0 },
    { label: 'LEFT', curr: 79, prev: 105 },
  ];

  return (
    <div className="flex flex-col gap-5 pb-10 select-none font-sans text-gray-800">
      
      {/* -------------------- ROW 1: TOP 4 STAT CARDS (SCREENSHOT 1) -------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: STUDENT HEAD COUNT (YTD) */}
        <div className="bg-white p-5 rounded border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <h3 className="text-xs font-bold text-gray-700 text-center tracking-tight uppercase">
            STUDENT HEAD COUNT <span className="font-semibold text-gray-500">(YTD)</span>
          </h3>
          <div className="text-center text-gray-700 text-sm my-3">
            Total: <span className="font-extrabold text-xl text-gray-950">1237</span>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs text-gray-700 font-medium mb-1">
                <span className="flex items-center gap-1.5"><FaMale className="text-gray-400 text-base" /> Boys</span>
                <span className="font-bold text-gray-900">783(63%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#94a3b8] h-full rounded-full transition-all duration-700" style={{ width: '63%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-gray-700 font-medium mb-1">
                <span className="flex items-center gap-1.5"><FaFemale className="text-[#ff6b6b] text-base" /> Girls</span>
                <span className="font-bold text-gray-900">454(37%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#ff6b6b] h-full rounded-full transition-all duration-700" style={{ width: '37%' }}></div>
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
            Total: <span className="font-extrabold text-xl text-gray-950">289</span>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs text-gray-700 font-medium mb-1">
                <span className="flex items-center gap-1.5 text-amber-800"><FaRegBuilding className="text-amber-500 text-sm" /> Reg. at school</span>
                <span className="font-bold text-gray-900">289(100%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#f59e0b] h-full rounded-full transition-all duration-700" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-gray-700 font-medium mb-1">
                <span className="flex items-center gap-1.5 text-blue-700"><FaGlobe className="text-[#00a2db] text-sm" /> Online Reg.</span>
                <span className="font-bold text-gray-900">0(0%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#00a2db] h-full rounded-full" style={{ width: '0%' }}></div>
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
              <span className="font-bold text-gray-900 text-sm">200(-31.03 %)</span>
              <span className="font-semibold text-gray-800 text-sm w-12 text-right">290</span>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-gray-700 font-medium"><FaFemale className="text-[#ff6b6b] text-base" /> Girls</span>
              <span className="font-bold text-gray-900 text-sm">89(-49.43 %)</span>
              <span className="font-semibold text-gray-800 text-sm w-12 text-right">176</span>
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
              <span className="font-bold text-gray-900 text-sm">783(20.65 %)</span>
              <span className="font-semibold text-gray-800 text-sm w-12 text-right">649</span>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-gray-700 font-medium"><FaFemale className="text-[#ff6b6b] text-base" /> Girls</span>
              <span className="font-bold text-gray-900 text-sm">454(11.27 %)</span>
              <span className="font-semibold text-gray-800 text-sm w-12 text-right">408</span>
            </div>
          </div>
        </div>

      </div>

      {/* -------------------- ROW 2: STUDENT STRENGTH STANDARD WISE (DUAL BAR CHART) (SCREENSHOT 2) -------------------- */}
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

        {/* SVG Dual Bar Chart with Exact Values on Top */}
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

            {/* Y-Axis Grid Lines & Ticks (0, 50, 100, 150, 200, 250) */}
            {[
              { val: '250', y: 20 },
              { val: '200', y: 56 },
              { val: '150', y: 92 },
              { val: '100', y: 128 },
              { val: '50', y: 164 },
              { val: '0', y: 200 },
            ].map((tick) => (
              <g key={tick.val}>
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
              // Bar 1: Total Students (Height scaling based on max 250 = 180px)
              const totalH = (item.total / 250) * 180;
              const totalY = 200 - totalH;
              // Bar 2: New Admission
              const newH = (item.newAdm / 250) * 180;
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

      {/* -------------------- ROW 3: COMPARISON & NEW ADMISSION IN 7 DAYS (SCREENSHOT 3) -------------------- */}
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

              {/* Y Ticks (0 to 1400) */}
              {[
                { val: '1400', y: 20 },
                { val: '1200', y: 44 },
                { val: '1000', y: 68 },
                { val: '800', y: 92 },
                { val: '600', y: 116 },
                { val: '400', y: 140 },
                { val: '200', y: 164 },
                { val: '0', y: 188 },
              ].map((tick) => (
                <g key={tick.val}>
                  <text x="50" y={tick.y + 4} textAnchor="end" fill="#64748b" fontSize="9" fontWeight="500">
                    {tick.val}
                  </text>
                  <line x1="54" y1={tick.y} x2="510" y2={tick.y} stroke={tick.val === '0' ? '#94a3b8' : '#f1f5f9'} strokeWidth="1" />
                </g>
              ))}

              {/* Bars */}
              {comparisonData.map((item, idx) => {
                const groupX = 70 + idx * 72;
                const currH = (item.curr / 1400) * 168;
                const currY = 188 - currH;
                const prevH = (item.prev / 1400) * 168;
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
                className={`px-3 py-1.5 transition-colors ${
                  admissionDaysTab === '7' ? 'bg-[#00a2db] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                LAST 7 DAYS
              </button>
              <button
                onClick={() => setAdmissionDaysTab('15')}
                className={`px-3 py-1.5 transition-colors border-l border-gray-200 ${
                  admissionDaysTab === '15' ? 'bg-[#00a2db] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                LAST 15 DAYS
              </button>
              <button
                onClick={() => setAdmissionDaysTab('30')}
                className={`px-3 py-1.5 transition-colors border-l border-gray-200 ${
                  admissionDaysTab === '30' ? 'bg-[#00a2db] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                LAST 30 DAYS
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-gray-600 font-semibold my-1">
            25-AUG-2026 TO 01-SEP-2026
          </div>

          <div className="flex items-center justify-between">
            {/* SVG Donut Chart with Leader Lines & Spin Animation */}
            <div className="flex-1 flex justify-center items-center">
              <svg viewBox="0 0 280 240" className="w-[260px] h-[230px] select-none overflow-visible">
                {/* 100% Boys Full Donut Ring */}
                <g className="animate-donut-spin" style={{ transformOrigin: '140px 120px' }}>
                  <circle cx="140" cy="120" r="75" fill="none" stroke="#00a2db" strokeWidth="36" />
                </g>

                {/* Center Counter */}
                <g className="animate-center-pop" style={{ transformOrigin: '140px 120px' }}>
                  <circle cx="140" cy="120" r="54" fill="#ffffff" />
                  <text x="140" y="140" textAnchor="middle" fill="#000000" style={{ fontSize: '64px', fontWeight: '900' }}>
                    1
                  </text>
                </g>

                {/* Leader Lines & Percentages */}
                <g className="animate-leader-lines">
                  <line x1="140" y1="45" x2="140" y2="28" stroke="#00a2db" strokeWidth="1" />
                  <text x="140" y="22" textAnchor="middle" fill="#000000" fontSize="13" fontWeight="600">
                    0%
                  </text>

                  <line x1="140" y1="195" x2="140" y2="212" stroke="#00a2db" strokeWidth="1" />
                  <text x="140" y="228" textAnchor="middle" fill="#000000" fontSize="13" fontWeight="600">
                    100%
                  </text>
                </g>
              </svg>
            </div>

            {/* Right Legend */}
            <div className="flex flex-col gap-2.5 text-xs text-gray-700 font-medium pr-6">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-[#00a2db] inline-block rounded-2xs"></span>
                <span>Boys</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-[#ff7675] inline-block rounded-2xs"></span>
                <span>Girls</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* -------------------- ROW 4: STANDARD WISE & RELIGION WISE (SCREENSHOT 4) -------------------- */}
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
                <span>TC Taken</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#fbc531] inline-block rounded-2xs"></span>
                <span>New Admission</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#e67e22] inline-block rounded-2xs"></span>
                <span>Old</span>
              </div>
            </div>
          </div>

          {/* Sub Stats: CLASS & Boys / Girls */}
          <div className="text-center">
            <div className="font-bold text-gray-900 text-sm">CLASS {currentClass}</div>
            <div className="flex justify-center gap-5 text-xs text-gray-700 font-medium mt-0.5">
              <span className="flex items-center gap-1"><FaMale className="text-gray-400 text-sm" /> Boys 30</span>
              <span className="flex items-center gap-1"><FaFemale className="text-[#ff6b6b] text-sm" /> Girls 16</span>
            </div>
          </div>

          {/* Donut Chart with Left/Right Arrows */}
          <div className="flex items-center justify-between py-2">
            <button
              onClick={handlePrevClass}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
              title="Previous Class"
            >
              <FaChevronLeft className="text-base" />
            </button>

            <svg viewBox="0 0 280 230" className="w-[260px] h-[220px] select-none overflow-visible">
              <g className="animate-donut-spin" style={{ transformOrigin: '140px 115px' }}>
                {/* 1. New Admission (Yellow 93%) 0 to 334.8° */}
                <path
                  d={(() => {
                    const toRad = (d) => ((d - 90) * Math.PI) / 180;
                    const s = toRad(0);
                    const e = toRad(334.8);
                    const x1 = 140 + 72 * Math.cos(s);
                    const y1 = 115 + 72 * Math.sin(s);
                    const x2 = 140 + 72 * Math.cos(e);
                    const y2 = 115 + 72 * Math.sin(e);
                    const x3 = 140 + 40 * Math.cos(e);
                    const y3 = 115 + 40 * Math.sin(e);
                    const x4 = 140 + 40 * Math.cos(s);
                    const y4 = 115 + 40 * Math.sin(s);
                    return `M ${x1} ${y1} A 72 72 0 1 1 ${x2} ${y2} L ${x3} ${y3} A 40 40 0 1 0 ${x4} ${y4} Z`;
                  })()}
                  fill="#fbc531"
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                {/* 2. Old (Orange 7%) 334.8° to 360° */}
                <path
                  d={(() => {
                    const toRad = (d) => ((d - 90) * Math.PI) / 180;
                    const s = toRad(334.8);
                    const e = toRad(360);
                    const x1 = 140 + 72 * Math.cos(s);
                    const y1 = 115 + 72 * Math.sin(s);
                    const x2 = 140 + 72 * Math.cos(e);
                    const y2 = 115 + 72 * Math.sin(e);
                    const x3 = 140 + 40 * Math.cos(e);
                    const y3 = 115 + 40 * Math.sin(e);
                    const x4 = 140 + 40 * Math.cos(s);
                    const y4 = 115 + 40 * Math.sin(s);
                    return `M ${x1} ${y1} A 72 72 0 0 1 ${x2} ${y2} L ${x3} ${y3} A 40 40 0 0 0 ${x4} ${y4} Z`;
                  })()}
                  fill="#e67e22"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              </g>

              {/* Center Counter */}
              <g className="animate-center-pop" style={{ transformOrigin: '140px 115px' }}>
                <circle cx="140" cy="115" r="39" fill="#ffffff" />
                <text x="140" y="132" textAnchor="middle" fill="#000000" style={{ fontSize: '48px', fontWeight: '900' }}>
                  46
                </text>
              </g>

              {/* Leader Lines & Percentages */}
              <g className="animate-leader-lines">
                <line x1="140" y1="43" x2="140" y2="28" stroke="#e67e22" strokeWidth="0.9" />
                <text x="140" y="22" textAnchor="middle" fill="#000000" fontSize="12" fontWeight="600">
                  7%
                </text>

                <line x1="140" y1="187" x2="145" y2="202" stroke="#fbc531" strokeWidth="0.9" />
                <text x="148" y="216" textAnchor="middle" fill="#000000" fontSize="12" fontWeight="600">
                  93%
                </text>
              </g>
            </svg>

            <button
              onClick={handleNextClass}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
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
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#e17055] inline-block rounded-2xs"></span><span>NA</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#dfe6e9] inline-block rounded-2xs"></span><span>MUSLIM</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#fbc531] inline-block rounded-2xs"></span><span>HINDU</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#55efc4] inline-block rounded-2xs"></span><span>O.B.C.</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#74b9ff] inline-block rounded-2xs"></span><span>SELECT CASTE CATEGORY</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#0984e3] inline-block rounded-2xs"></span><span>S.C.</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#d63031] inline-block rounded-2xs"></span><span>GENERAL</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#fd79a8] inline-block rounded-2xs"></span><span>S.T.</span></div>
            </div>
          </div>

          <div className="flex justify-center items-center py-2">
            <svg viewBox="0 0 320 240" className="w-[300px] h-[230px] select-none overflow-visible">
              {/* Donut Slices */}
              <g className="animate-donut-spin" style={{ transformOrigin: '160px 120px' }}>
                {/* 1. General (Orange/Coral 53%) 0° to 190.8° */}
                <path
                  d={(() => {
                    const toRad = (d) => ((d - 90) * Math.PI) / 180;
                    const s = toRad(0);
                    const e = toRad(190.8);
                    const x1 = 160 + 75 * Math.cos(s);
                    const y1 = 120 + 75 * Math.sin(s);
                    const x2 = 160 + 75 * Math.cos(e);
                    const y2 = 120 + 75 * Math.sin(e);
                    const x3 = 160 + 42 * Math.cos(e);
                    const y3 = 120 + 42 * Math.sin(e);
                    const x4 = 160 + 42 * Math.cos(s);
                    const y4 = 120 + 42 * Math.sin(s);
                    return `M ${x1} ${y1} A 75 75 0 1 1 ${x2} ${y2} L ${x3} ${y3} A 42 42 0 1 0 ${x4} ${y4} Z`;
                  })()}
                  fill="#fbc531"
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                {/* 2. OBC (Mint Green 26%) 190.8° to 284.4° */}
                <path
                  d={(() => {
                    const toRad = (d) => ((d - 90) * Math.PI) / 180;
                    const s = toRad(190.8);
                    const e = toRad(284.4);
                    const x1 = 160 + 75 * Math.cos(s);
                    const y1 = 120 + 75 * Math.sin(s);
                    const x2 = 160 + 75 * Math.cos(e);
                    const y2 = 120 + 75 * Math.sin(e);
                    const x3 = 160 + 42 * Math.cos(e);
                    const y3 = 120 + 42 * Math.sin(e);
                    const x4 = 160 + 42 * Math.cos(s);
                    const y4 = 120 + 42 * Math.sin(s);
                    return `M ${x1} ${y1} A 75 75 0 0 1 ${x2} ${y2} L ${x3} ${y3} A 42 42 0 0 0 ${x4} ${y4} Z`;
                  })()}
                  fill="#55efc4"
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                {/* 3. SC / ST (Silver 12%) 284.4° to 327.6° */}
                <path
                  d={(() => {
                    const toRad = (d) => ((d - 90) * Math.PI) / 180;
                    const s = toRad(284.4);
                    const e = toRad(327.6);
                    const x1 = 160 + 75 * Math.cos(s);
                    const y1 = 120 + 75 * Math.sin(s);
                    const x2 = 160 + 75 * Math.cos(e);
                    const y2 = 120 + 75 * Math.sin(e);
                    const x3 = 160 + 42 * Math.cos(e);
                    const y3 = 120 + 42 * Math.sin(e);
                    const x4 = 160 + 42 * Math.cos(s);
                    const y4 = 120 + 42 * Math.sin(s);
                    return `M ${x1} ${y1} A 75 75 0 0 1 ${x2} ${y2} L ${x3} ${y3} A 42 42 0 0 0 ${x4} ${y4} Z`;
                  })()}
                  fill="#dfe6e9"
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                {/* 4. NA (Terracotta 8%) 327.6° to 360° */}
                <path
                  d={(() => {
                    const toRad = (d) => ((d - 90) * Math.PI) / 180;
                    const s = toRad(327.6);
                    const e = toRad(360);
                    const x1 = 160 + 75 * Math.cos(s);
                    const y1 = 120 + 75 * Math.sin(s);
                    const x2 = 160 + 75 * Math.cos(e);
                    const y2 = 120 + 75 * Math.sin(e);
                    const x3 = 160 + 42 * Math.cos(e);
                    const y3 = 120 + 42 * Math.sin(e);
                    const x4 = 160 + 42 * Math.cos(s);
                    const y4 = 120 + 42 * Math.sin(s);
                    return `M ${x1} ${y1} A 75 75 0 0 1 ${x2} ${y2} L ${x3} ${y3} A 42 42 0 0 0 ${x4} ${y4} Z`;
                  })()}
                  fill="#e17055"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              </g>

              {/* Center Counter */}
              <g className="animate-center-pop" style={{ transformOrigin: '160px 120px' }}>
                <circle cx="160" cy="120" r="41" fill="#ffffff" />
                <text x="160" y="137" textAnchor="middle" fill="#000000" style={{ fontSize: '46px', fontWeight: '900' }}>
                  1237
                </text>
              </g>

              {/* Leader Lines */}
              <g className="animate-leader-lines">
                <line x1="160" y1="195" x2="152" y2="210" stroke="#fbc531" strokeWidth="0.9" />
                <text x="148" y="224" textAnchor="middle" fill="#000000" fontSize="12" fontWeight="600">
                  53%
                </text>

                <line x1="102" y1="168" x2="88" y2="178" stroke="#55efc4" strokeWidth="0.9" />
                <text x="82" y="184" textAnchor="end" fill="#000000" fontSize="12" fontWeight="600">
                  12%
                </text>

                <line x1="230" y1="150" x2="248" y2="156" stroke="#74b9ff" strokeWidth="0.9" />
                <text x="254" y="160" textAnchor="start" fill="#000000" fontSize="12" fontWeight="600">
                  26%
                </text>

                <line x1="232" y1="185" x2="248" y2="190" stroke="#fd79a8" strokeWidth="0.9" />
                <text x="254" y="195" textAnchor="start" fill="#000000" fontSize="12" fontWeight="600">
                  1%
                </text>

                <line x1="160" y1="45" x2="160" y2="30" stroke="#e17055" strokeWidth="0.9" />
                <text x="160" y="24" textAnchor="middle" fill="#000000" fontSize="12" fontWeight="600">
                  0%
                </text>
              </g>
            </svg>
          </div>
        </div>

      </div>

      {/* -------------------- ROW 5: TC & CATEGORY (SCREENSHOT 5) -------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Left: TRANSFER CERTIFICATE STATISTICS */}
        <div className="bg-white p-5 rounded border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xs font-bold text-gray-800 tracking-tight uppercase">
              TRANSFER CERTIFICATE STATISTICS
            </h3>
            <div className="flex flex-col gap-1.5 text-[11px] text-gray-700 font-medium">
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-[#00a2db] inline-block rounded-2xs"></span><span>Drafted</span></div>
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-[#ff7675] inline-block rounded-2xs"></span><span>Generated</span></div>
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-[#fbc531] inline-block rounded-2xs"></span><span>Cancelled</span></div>
            </div>
          </div>

          <div className="h-44 flex flex-col items-center justify-center">
            <span className="text-base font-bold text-gray-700 tracking-wider">NaN%</span>
            <div className="w-24 h-0.5 bg-gray-300 mt-1"></div>
          </div>
        </div>

        {/* Right: CATEGORY WISE STUDENT STATISTICS */}
        <div className="bg-white p-5 rounded border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs font-bold text-gray-800 tracking-tight uppercase">
              CATEGORY WISE STUDENT STATISTICS
            </h3>
            <div className="flex flex-col gap-1.5 text-[11px] text-gray-700 font-medium">
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-[#e17055] inline-block rounded-2xs"></span><span>NA</span></div>
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-[#d35400] inline-block rounded-2xs"></span><span>Gen</span></div>
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-[#fbc531] inline-block rounded-2xs"></span><span>OBC</span></div>
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-[#55efc4] inline-block rounded-2xs"></span><span>SC</span></div>
            </div>
          </div>

          <div className="flex justify-center items-center py-2">
            <svg viewBox="0 0 280 230" className="w-[260px] h-[220px] select-none overflow-visible">
              {/* Donut Ring with 96% General */}
              <g className="animate-donut-spin" style={{ transformOrigin: '140px 115px' }}>
                {/* 96% Gen (Deep Terracotta) */}
                <path
                  d={(() => {
                    const toRad = (d) => ((d - 90) * Math.PI) / 180;
                    const s = toRad(0);
                    const e = toRad(345.6);
                    const x1 = 140 + 72 * Math.cos(s);
                    const y1 = 115 + 72 * Math.sin(s);
                    const x2 = 140 + 72 * Math.cos(e);
                    const y2 = 115 + 72 * Math.sin(e);
                    const x3 = 140 + 40 * Math.cos(e);
                    const y3 = 115 + 40 * Math.sin(e);
                    const x4 = 140 + 40 * Math.cos(s);
                    const y4 = 115 + 40 * Math.sin(s);
                    return `M ${x1} ${y1} A 72 72 0 1 1 ${x2} ${y2} L ${x3} ${y3} A 40 40 0 1 0 ${x4} ${y4} Z`;
                  })()}
                  fill="#d35400"
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                {/* 4% OBC/SC */}
                <path
                  d={(() => {
                    const toRad = (d) => ((d - 90) * Math.PI) / 180;
                    const s = toRad(345.6);
                    const e = toRad(360);
                    const x1 = 140 + 72 * Math.cos(s);
                    const y1 = 115 + 72 * Math.sin(s);
                    const x2 = 140 + 72 * Math.cos(e);
                    const y2 = 115 + 72 * Math.sin(e);
                    const x3 = 140 + 40 * Math.cos(e);
                    const y3 = 115 + 40 * Math.sin(e);
                    const x4 = 140 + 40 * Math.cos(s);
                    const y4 = 115 + 40 * Math.sin(s);
                    return `M ${x1} ${y1} A 72 72 0 0 1 ${x2} ${y2} L ${x3} ${y3} A 40 40 0 0 0 ${x4} ${y4} Z`;
                  })()}
                  fill="#fbc531"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              </g>

              {/* Center Counter */}
              <g className="animate-center-pop" style={{ transformOrigin: '140px 115px' }}>
                <circle cx="140" cy="115" r="39" fill="#ffffff" />
                <text x="140" y="132" textAnchor="middle" fill="#000000" style={{ fontSize: '46px', fontWeight: '900' }}>
                  1237
                </text>
              </g>

              {/* Leader Lines */}
              <g className="animate-leader-lines">
                <line x1="140" y1="187" x2="140" y2="202" stroke="#d35400" strokeWidth="0.9" />
                <text x="140" y="216" textAnchor="middle" fill="#000000" fontSize="12" fontWeight="600">
                  96%
                </text>

                <line x1="135" y1="43" x2="135" y2="28" stroke="#fbc531" strokeWidth="0.9" />
                <text x="135" y="22" textAnchor="middle" fill="#000000" fontSize="12" fontWeight="600">
                  1%
                </text>
              </g>
            </svg>
          </div>
        </div>

      </div>

    </div>
  );
}
