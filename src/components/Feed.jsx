import React from 'react';
import { FaBullhorn } from 'react-icons/fa';

function Feed({ data }) {
  const notices = data && data.length > 0 ? data : [];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex-1 flex flex-col h-full min-h-[350px]">
      
      <h2 className="text-lg font-bold text-gray-800 mb-6">Feed</h2>
      
      <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar">
        {notices.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">No recent notices</div>
        ) : notices.map((notice, index) => (
          <div key={index} className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition px-2 -mx-2 rounded-lg">
            
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-500 flex items-center justify-center flex-shrink-0 mt-1">
              <FaBullhorn />
            </div>
            
            <div className="flex-1">
              <div className="font-bold text-gray-800 text-sm mb-1">{notice.type}</div>
              <div className="text-gray-600 text-sm mb-2">{notice.title}</div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  {notice.date}
                </span>
                <button className="text-green-500 hover:text-green-700 text-sm font-medium transition flex items-center gap-1">
                  View <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default Feed;
