import React from 'react';

function DashboardCard({ icon: Icon, iconColor, iconBgColor, title, mainValue, subStats, showVisit = true }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-between hover:shadow-md transition duration-300">
      
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Icon Circle */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBgColor}`}>
            <Icon className={`text-xl ${iconColor}`} />
          </div>
          <span className="font-bold text-gray-700 text-[15px]">{title}</span>
        </div>
        
        <div className="text-right">
          {mainValue !== undefined && (
            <span className="text-2xl font-normal text-gray-800">{mainValue}</span>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col items-end">
        {subStats && (
          <div className="w-full flex flex-col gap-2 mb-2 text-xs text-gray-600">
            {subStats.map((stat, idx) => (
              <div key={idx} className="flex justify-between items-center w-full">
                {stat.barColor && (
                  <div className="w-1/2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${stat.barColor}`} style={{ width: stat.percentage }}></div>
                  </div>
                )}
                <span className="flex-1 text-right">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
        
        {showVisit && (
          <a href="#" className="text-green-500 hover:text-green-600 text-sm flex items-center gap-1 transition">
            Visit <span>→</span>
          </a>
        )}
      </div>

    </div>
  );
}

export default DashboardCard;
