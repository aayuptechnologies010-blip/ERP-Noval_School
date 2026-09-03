import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function ActivityCalendarWidget({ data }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Format MM/YYYY
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay();
  
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);
  
  const activities = data || [];
  
  const hasActivity = (day, m, y) => {
    return activities.some(act => {
      if (!act.date) return false;
      const d = new Date(act.date);
      return d.getDate() === day && d.getMonth() === m && d.getFullYear() === y;
    });
  };

  const today = new Date();
  const isToday = (day, m, y) => {
    return today.getDate() === day && today.getMonth() === m && today.getFullYear() === y;
  };

  const gridCells = [];
  
  // Previous month cells
  for (let i = 0; i < firstDay; i++) {
    const day = daysInPrevMonth - firstDay + i + 1;
    const isAct = hasActivity(day, month - 1, year);
    gridCells.push(
      <div key={`prev-${i}`} className={`flex items-center justify-center border-r border-b border-gray-200 p-2 text-sm ${isAct ? 'text-red-500 font-medium' : 'text-gray-300'}`}>
        {day}
      </div>
    );
  }
  
  // Current month cells
  for (let day = 1; day <= daysInMonth; day++) {
    const isAct = hasActivity(day, month, year);
    const todayFlag = isToday(day, month, year);
    
    if (todayFlag) {
      gridCells.push(
        <div key={`curr-${day}`} className="flex flex-col items-center justify-center text-green-500 font-medium bg-green-50 border-r border-b border-gray-200 p-1">
          <span className="text-[9px] text-green-600 mb-0.5">Today</span>
          <span className="text-sm">{day}</span>
        </div>
      );
    } else {
      gridCells.push(
        <div key={`curr-${day}`} className={`flex items-center justify-center border-r border-b border-gray-200 p-2 text-sm ${isAct ? 'text-red-500 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>
          {day}
        </div>
      );
    }
  }
  
  // Next month cells to complete the grid (6 rows of 7 days = 42 cells)
  const remainingCells = 42 - gridCells.length;
  for (let i = 1; i <= remainingCells; i++) {
    const isAct = hasActivity(i, month + 1, year);
    gridCells.push(
      <div key={`next-${i}`} className={`flex items-center justify-center border-r border-b border-gray-200 p-2 text-sm ${isAct ? 'text-red-300 font-medium' : 'text-gray-300'}`}>
        {i}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex-1 flex flex-col h-full min-h-[350px]">
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Activity Calendar</h2>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-gray-800 uppercase text-sm tracking-wide">{monthName} {year}</div>
        <div className="flex items-center gap-1">
          <button onClick={handlePrevMonth} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-gray-600 transition">
            <FaChevronLeft className="text-xs" />
          </button>
          <button onClick={handleNextMonth} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-gray-600 transition">
            <FaChevronRight className="text-xs" />
          </button>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden flex-1 flex flex-col">
        {/* Header */}
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
          {daysOfWeek.map(day => (
            <div key={day} className="py-2 text-center text-xs font-bold text-gray-700 border-r border-gray-200 last:border-0">
              {day}
            </div>
          ))}
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-7 flex-1">
          {gridCells}
        </div>
      </div>
      
    </div>
  );
}

export default ActivityCalendarWidget;
