import React from 'react';

function QuestionnaireWidget() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex-1 flex flex-col h-full min-h-[350px]">
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Questionnaire</h2>
        <button className="text-green-500 hover:text-green-700 text-sm font-medium transition flex items-center gap-1">
          View <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Placeholder area for the empty questionnaire box shown in screenshot */}
      </div>
      
    </div>
  );
}

export default QuestionnaireWidget;
