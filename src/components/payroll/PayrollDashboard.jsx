import React from 'react';
import { FaMale, FaFemale, FaCalendarAlt, FaUsers, FaUserMinus, FaRegCalendarAlt, FaCalendarDay, FaCalendarCheck } from 'react-icons/fa';

const StatCard = ({ title, children }) => (
  <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4">
    <h3 className="text-gray-700 text-xs font-bold uppercase mb-4">{title}</h3>
    {children}
  </div>
);

const ProgressBar = ({ label, count, percentage, colorClass, icon: Icon, iconColor }) => (
  <div className="mb-4 last:mb-0">
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-2">
        <Icon className={`${iconColor} text-lg`} />
        <span className="text-gray-600 text-xs">{label}</span>
      </div>
      <span className="text-gray-800 text-xs font-bold">
        {count} ({percentage}%)
      </span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-1">
      <div className={`${colorClass} h-1 rounded-full`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

const GridItem = ({ label, count, icon: Icon, iconColor }) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-2 mb-1">
      <Icon className={`${iconColor} text-lg`} />
      <span className="text-gray-600 text-xs">{label}</span>
      <span className="text-gray-800 text-sm font-bold ml-auto">{count}</span>
    </div>
    <div className="flex justify-end">
      <a href="#" className="text-blue-500 text-xs flex items-center gap-1 hover:underline">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        View All
      </a>
    </div>
  </div>
);

const SimpleStatRow = ({ label, count, percentage, icon: Icon, iconColor }) => (
  <div className="flex items-center justify-between mb-4 last:mb-0 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
    <div className="flex items-center gap-2">
      <Icon className={`${iconColor} text-lg`} />
      <span className="text-gray-600 text-xs">{label}</span>
    </div>
    <span className="text-gray-800 text-xs font-bold">
      {count} ({percentage}%)
    </span>
  </div>
);


const PayrollDashboard = () => {
  return (
    <div className="flex-1 bg-[#f4f5f7] flex flex-col min-h-screen">
      {/* Quick Access Bar */}
      <div className="bg-[#e5e5f0] border-b border-[#d5d5d5] px-4 py-2 flex items-center shadow-sm z-10">
        <span className="text-[#3498db] text-xs font-bold mr-2 uppercase tracking-wider">Quick Access</span>
        <span className="text-[#3498db] text-xs">&gt;</span>
      </div>

      {/* Dashboard Content */}
      <div className="p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">

          {/* Employee Head Count */}
          <StatCard title="EMPLOYEE HEAD COUNT (YTD)">
            <div className="text-center mb-6">
              <span className="text-gray-500 text-lg">Total: </span>
              <span className="text-gray-800 text-2xl font-bold">32</span>
            </div>
            <ProgressBar
              label="Male" count={17} percentage={53.13}
              colorClass="bg-gray-400" icon={FaMale} iconColor="text-gray-400"
            />
            <ProgressBar
              label="Female" count={15} percentage={46.88}
              colorClass="bg-red-400" icon={FaFemale} iconColor="text-red-400"
            />
          </StatCard>

          {/* New Joinings */}
          <StatCard title="NEW JOININGS (YTD)">
            <div className="mt-8">
              <SimpleStatRow
                label="Male" count={0} percentage={0}
                icon={FaMale} iconColor="text-gray-400"
              />
              <SimpleStatRow
                label="Female" count={0} percentage={0}
                icon={FaFemale} iconColor="text-red-400"
              />
            </div>
          </StatCard>

          {/* No. Of Retirements */}
          <StatCard title="NO. OF RETIREMENTS">
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 mt-4">
              <GridItem label="Year To Date" count={1} icon={FaRegCalendarAlt} iconColor="text-green-500" />
              <GridItem label="This Month" count={0} icon={FaCalendarAlt} iconColor="text-blue-400" />
              <GridItem label="Next Month" count={0} icon={FaCalendarAlt} iconColor="text-red-400" />
              <GridItem label="This Year" count={1} icon={FaCalendarDay} iconColor="text-blue-400" />
            </div>
          </StatCard>

          {/* No. Of Probation */}
          <StatCard title="NO. OF PROBATION">
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 mt-4">
              <GridItem label="This Month" count={0} icon={FaCalendarCheck} iconColor="text-blue-400" />
              <GridItem label="This Year" count={0} icon={FaCalendarAlt} iconColor="text-blue-400" />
            </div>
          </StatCard>

          {/* Joined and Left Employee */}
          <StatCard title="JOINED AND LEFT EMPLOYEE (YTD)">
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 mt-4">
              <GridItem label="Joined" count={0} icon={FaUsers} iconColor="text-green-500" />
              <GridItem label="Left" count={0} icon={FaUserMinus} iconColor="text-red-400" />
            </div>
          </StatCard>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatCard title="EMPLOYEE STATISTICS (STAFF TYPE WISE)">
            <div className="h-64 flex items-end justify-end px-4 border-l border-b border-gray-200 relative mt-4">
              {/* Y-axis labels mock */}
              <div className="absolute left-[-25px] top-0 bottom-0 flex flex-col justify-between text-[10px] text-gray-400">
                <span>30</span><span>25</span><span>20</span><span>15</span><span>10</span><span>5</span><span>0</span>
              </div>
              {/* Y-axis title mock */}
              <div className="absolute left-[-45px] top-1/2 -rotate-90 text-[10px] text-gray-500 font-bold tracking-widest origin-center translate-y-1/2">
                NO. OF EMPLOYEES
              </div>
              {/* Chart Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between z-0">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-full border-t border-gray-100"></div>
                ))}
              </div>

              {/* Mock Bar */}
              <div className="w-8 bg-cyan-400 z-10 relative group h-full">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-700">30</div>
              </div>
            </div>
          </StatCard>

          <StatCard title="SALARY DISBURSEMENT STATISTICS">
            <div className="h-64 flex items-end px-4 border-l border-b border-gray-200 relative mt-4">
              {/* Y-axis labels mock */}
              <div className="absolute left-[-20px] top-0 bottom-0 flex flex-col justify-between text-[10px] text-gray-400">
                <span>1</span><span>0.9</span><span>0.8</span><span>0.7</span><span>0.6</span><span>0.5</span>
              </div>
              {/* Y-axis title mock */}
              <div className="absolute left-[-45px] top-1/2 -rotate-90 text-[10px] text-gray-500 font-bold tracking-widest origin-center translate-y-1/2">
                AMOUNT (₹)
              </div>
              {/* Chart Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between z-0">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-full border-t border-gray-100"></div>
                ))}
              </div>
            </div>
          </StatCard>
        </div>
      </div>
    </div>
  );
};

export default PayrollDashboard;
