import React from 'react';

function QuestionnaireWidget({ data }) {
  const questionnaires = data && data.length > 0 ? data : [];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex-1 flex flex-col h-full min-h-[350px]">
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Questionnaire</h2>
        <button className="text-green-500 hover:text-green-700 text-sm font-medium transition flex items-center gap-1">
          View <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        {questionnaires.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            No active questionnaires
          </div>
        ) : (
          <div className="overflow-y-auto no-scrollbar">
            {questionnaires.map((q, index) => (
              <div key={index} className="py-3 border-b border-gray-100 last:border-0">
                <div className="text-gray-800 font-medium text-sm mb-1">{q.title}</div>
                {q.date && (
                  <div className="text-gray-400 text-xs flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    {new Date(q.date).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
}

export default QuestionnaireWidget;
