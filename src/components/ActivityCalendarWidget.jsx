import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function ActivityCalendarWidget() {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  // Dummy data for July 2026 based on screenshot
  // 28, 29, 30 are from June
  // 31 has 'Today'
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex-1 flex flex-col h-full min-h-[350px]">
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Activity Calendar</h2>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-gray-800 uppercase text-sm tracking-wide">July 2026</div>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-gray-600 transition">
            <FaChevronLeft className="text-xs" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-gray-600 transition">
            <FaChevronRight className="text-xs" />
          </button>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden flex-1 flex flex-col">
        {/* Header */}
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
          {days.map(day => (
            <div key={day} className="py-2 text-center text-xs font-bold text-gray-700 border-r border-gray-200 last:border-0">
              {day}
            </div>
          ))}
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-7 flex-1">
          {/* Row 1 */}
          <div className="flex items-center justify-center text-red-200 border-r border-b border-gray-200 p-2 text-sm">28</div>
          <div className="flex items-center justify-center text-green-200 border-r border-b border-gray-200 p-2 text-sm">29</div>
          <div className="flex items-center justify-center text-green-200 border-r border-b border-gray-200 p-2 text-sm">30</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-b border-gray-200 p-2 text-sm">1</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-b border-gray-200 p-2 text-sm">2</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-b border-gray-200 p-2 text-sm">3</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-b border-gray-200 p-2 text-sm">4</div>

          {/* Row 2 */}
          <div className="flex items-center justify-center text-red-500 font-medium border-r border-b border-gray-200 p-2 text-sm">5</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-b border-gray-200 p-2 text-sm">6</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-b border-gray-200 p-2 text-sm">7</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-b border-gray-200 p-2 text-sm">8</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-b border-gray-200 p-2 text-sm">9</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-b border-gray-200 p-2 text-sm">10</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-b border-gray-200 p-2 text-sm">11</div>

          {/* Row 3 */}
          <div className="flex items-center justify-center text-red-500 font-medium border-r border-b border-gray-200 p-2 text-sm">12</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-b border-gray-200 p-2 text-sm">13</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-b border-gray-200 p-2 text-sm">14</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-b border-gray-200 p-2 text-sm">15</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-b border-gray-200 p-2 text-sm">16</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-b border-gray-200 p-2 text-sm">17</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-b border-gray-200 p-2 text-sm">18</div>

          {/* Row 4 */}
          <div className="flex items-center justify-center text-red-500 font-medium border-r border-b border-gray-200 p-2 text-sm">19</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-b border-gray-200 p-2 text-sm">20</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-b border-gray-200 p-2 text-sm">21</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-b border-gray-200 p-2 text-sm">22</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-b border-gray-200 p-2 text-sm">23</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-b border-gray-200 p-2 text-sm">24</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-b border-gray-200 p-2 text-sm">25</div>

          {/* Row 5 */}
          <div className="flex items-center justify-center text-red-500 font-medium border-r border-gray-200 p-2 text-sm">26</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-gray-200 p-2 text-sm">27</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-gray-200 p-2 text-sm">28</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-gray-200 p-2 text-sm">29</div>
          <div className="flex items-center justify-center text-green-500 font-medium border-r border-gray-200 p-2 text-sm">30</div>
          <div className="flex flex-col items-center justify-center text-green-500 font-medium bg-green-50 border-r border-gray-200 p-1">
            <span className="text-[9px] text-green-600 mb-0.5">Today</span>
            <span className="text-sm">31</span>
          </div>
          <div className="flex items-center justify-center text-green-200 border-gray-200 p-2 text-sm">1</div>
        </div>
      </div>
      
    </div>
  );
}

export default ActivityCalendarWidget;
