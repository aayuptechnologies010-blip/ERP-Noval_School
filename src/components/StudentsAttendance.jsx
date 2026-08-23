import React, { useState, useEffect } from 'react';

function StudentsAttendance() {
  const [data, setData] = useState({ classSummaries: [], overallSummary: { Total: 0 } });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodayAttendance = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/attendance/today`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const result = await res.json();
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching today's attendance summary:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodayAttendance();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 mb-8 w-full">
      
      {/* Header section */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <h2 className="text-lg font-bold text-gray-800">Students' Attendance (Today)</h2>
        <select className="border border-gray-300 rounded-md px-2 py-1 text-sm outline-none text-gray-600">
          <option>All classes ({data.totalClassesCovered || data.classSummaries?.length || 0})</option>
        </select>
        {!loading && data.overallSummary && (
           <div className="ml-auto flex items-center gap-3 text-xs font-semibold">
              <span className="text-gray-600">Total: {data.overallSummary.Total || 0}</span>
              <span className="text-green-500">P: {data.overallSummary.Present || 0}</span>
              <span className="text-red-500">A: {data.overallSummary.Absent || 0}</span>
           </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-4 max-h-[300px] overflow-y-auto no-scrollbar">
        {loading ? (
          <div className="col-span-full text-center text-sm text-gray-500 py-4">Loading today's attendance...</div>
        ) : data.classSummaries && data.classSummaries.length > 0 ? (
          data.classSummaries.map((clsSummary, index) => (
            <div key={index} className="flex items-center justify-end gap-2 text-sm">
              <span className="text-gray-600 font-medium mr-1 w-8 text-right whitespace-nowrap">{clsSummary.class}</span>
              <div className="bg-green-500 text-white rounded w-6 h-6 flex items-center justify-center text-xs" title="Present">{clsSummary.Present || 0}</div>
              <div className="bg-red-400 text-white rounded w-6 h-6 flex items-center justify-center text-xs" title="Absent">{clsSummary.Absent || 0}</div>
              <div className="bg-blue-400 text-white rounded w-6 h-6 flex items-center justify-center text-xs" title="Leave">{clsSummary.Leave || 0}</div>
              <div className="bg-orange-400 text-white rounded w-6 h-6 flex items-center justify-center text-xs" title="Half Day / Late">{(clsSummary.HalfDay || 0) + (clsSummary.Late || 0)}</div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-sm text-gray-500 py-4">No attendance marked today.</div>
        )}
      </div>
      
    </div>
  );
}

export default StudentsAttendance;
