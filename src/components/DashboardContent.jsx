import React from 'react';
import { 
  FaUsers, FaUserTie, FaChartLine, FaWalking, FaSuitcase, 
  FaEnvelope, FaBell, FaSync, FaUserCheck, FaHospital, 
  FaBriefcase, FaUserPlus, FaCamera, FaQuestionCircle, 
  FaLightbulb, FaIdCard, FaFileAlt, FaUserGraduate, FaVideo
} from 'react-icons/fa';
import DashboardCard from './DashboardCard';
import EstimatedCollectionChart from './EstimatedCollectionChart';
import DailyCollection from './DailyCollection';
import FeeDefaulter from './FeeDefaulter';
import BankBalance from './BankBalance';
import StudentsAttendance from './StudentsAttendance';
import StaffAttendance from './StaffAttendance';
import AdmissionStats from './AdmissionStats';
import StandardStats from './StandardStats';
import AdmissionTypeStats from './AdmissionTypeStats';
import LibraryFineStatus from './LibraryFineStatus';
import StudentStatistic from './StudentStatistic';
import LibraryBookStatus from './LibraryBookStatus';
import Feed from './Feed';
import ActivityCalendarWidget from './ActivityCalendarWidget';
import QuestionnaireWidget from './QuestionnaireWidget';
import BirthdayCards from './BirthdayCards';

function DashboardContent() {
  return (
    <div className="flex-1 bg-[#f9fafb] rounded-tl-[2rem] p-6 overflow-y-auto no-scrollbar relative">
      
      {/* Video Tutorial Link */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition text-gray-700">
          <span className="font-bold text-sm">Video Tutorial</span>
          <FaVideo className="text-green-500 text-xl" />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
        <DashboardCard 
          icon={FaUsers} iconBgColor="bg-pink-100" iconColor="text-pink-400"
          title="Total Students" mainValue="1232"
          subStats={[
            { label: 'Girls 452 (37%)', percentage: '37%', barColor: 'bg-blue-500' },
            { label: 'Boys 780 (63%)', percentage: '63%', barColor: 'bg-blue-500' }
          ]} showVisit={false}
        />
        <DashboardCard 
          icon={FaUserTie} iconBgColor="bg-green-100" iconColor="text-green-500"
          title="Total Staff" mainValue="38"
          subStats={[
            { label: 'Female 19 (50%)', percentage: '50%', barColor: 'bg-blue-500' },
            { label: 'Male 19 (50%)', percentage: '50%', barColor: 'bg-blue-500' }
          ]} showVisit={false}
        />
        <DashboardCard 
          icon={FaChartLine} iconBgColor="bg-red-100" iconColor="text-red-400"
          title="Progress Stats"
          subStats={[
            { label: 'New Admission 282/1232', percentage: '20%', barColor: 'bg-orange-400' },
            { label: 'New Staff 0/38', percentage: '0%', barColor: 'bg-orange-400' }
          ]} showVisit={false}
        />
        <DashboardCard 
          icon={FaWalking} iconBgColor="bg-orange-100" iconColor="text-orange-400"
          title="Students' Pending Leave" mainValue="0"
        />
        
        <DashboardCard 
          icon={FaSuitcase} iconBgColor="bg-yellow-100" iconColor="text-yellow-500"
          title="Staff's Pending Leave" mainValue="0"
        />
        <DashboardCard 
          icon={FaEnvelope} iconBgColor="bg-green-100" iconColor="text-green-500"
          title="New Messages" mainValue="0"
        />
        <DashboardCard 
          icon={FaBell} iconBgColor="bg-green-100" iconColor="text-green-500"
          title="New Notices" mainValue="0"
        />
        <DashboardCard 
          icon={FaSync} iconBgColor="bg-teal-100" iconColor="text-teal-500"
          title="New Circulars" mainValue="0"
        />

        <DashboardCard 
          icon={FaUserCheck} iconBgColor="bg-orange-100" iconColor="text-orange-400"
          title="My Attendance" mainValue="0%"
        />
        <DashboardCard 
          icon={FaHospital} iconBgColor="bg-pink-100" iconColor="text-pink-500"
          title="Students In Infirmary" mainValue="0"
        />
        <DashboardCard 
          icon={FaBriefcase} iconBgColor="bg-purple-100" iconColor="text-purple-500"
          title="Workload" mainValue="0"
        />
        <DashboardCard 
          icon={FaUserPlus} iconBgColor="bg-indigo-100" iconColor="text-indigo-500"
          title="New Student(s)" mainValue="282" showVisit={false}
        />

        <DashboardCard 
          icon={FaCamera} iconBgColor="bg-blue-100" iconColor="text-blue-500"
          title="User's Photo Request" mainValue="3"
        />
        <DashboardCard 
          icon={FaQuestionCircle} iconBgColor="bg-teal-100" iconColor="text-teal-400"
          title="Questionnaire" mainValue="1"
        />
        <DashboardCard 
          icon={FaLightbulb} iconBgColor="bg-red-100" iconColor="text-red-400"
          title="Thoughts" mainValue="6"
        />
        <DashboardCard 
          icon={FaIdCard} iconBgColor="bg-orange-100" iconColor="text-orange-600"
          title="I-Card Photo Request" mainValue="8"
        />
        
        <DashboardCard 
          icon={FaUserTie} iconBgColor="bg-green-400" iconColor="text-white"
          title="Staff Profile Request" mainValue="0"
        />
        <DashboardCard 
          icon={FaFileAlt} iconBgColor="bg-purple-400" iconColor="text-white"
          title="Approval Request" mainValue="0"
        />
        <DashboardCard 
          icon={FaUserGraduate} iconBgColor="bg-green-400" iconColor="text-white"
          title="Student Profile Request" mainValue="0"
        />

      </div>

      {/* Main Chart */}
      <EstimatedCollectionChart />

      {/* Daily Mode Wise Collection */}
      <DailyCollection />

      {/* Two Column Layout: Fee Defaulter & Bank Balance */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8 items-stretch">
        <div className="w-full lg:w-2/3 flex">
          <FeeDefaulter />
        </div>
        <div className="w-full lg:w-1/3 flex">
          <BankBalance />
        </div>
      </div>

      {/* Students Attendance */}
      <StudentsAttendance />

      {/* Two Column Layout: Staff Attendance & Admission Stats */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8 items-stretch">
        <div className="w-full lg:w-1/3 flex">
          <StaffAttendance />
        </div>
        <div className="w-full lg:w-2/3 flex">
          <AdmissionStats />
        </div>
      </div>

      {/* Two Column Layout: Standard Stats & Admission Type */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8 items-stretch">
        <div className="w-full lg:w-1/2 flex">
          <StandardStats />
        </div>
        <div className="w-full lg:w-1/2 flex">
          <AdmissionTypeStats />
        </div>
      </div>

      {/* Two Column Layout: Library Fine Status & Student Statistic */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8 items-stretch">
        <div className="w-full lg:w-1/2 flex">
          <LibraryFineStatus />
        </div>
        <div className="w-full lg:w-1/2 flex">
          <StudentStatistic />
        </div>
      </div>

      {/* Two Column Layout: Library Book Status & Feed */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8 items-stretch">
        <div className="w-full lg:w-1/2 flex">
          <LibraryBookStatus />
        </div>
        <div className="w-full lg:w-1/2 flex">
          <Feed />
        </div>
      </div>

      {/* Two Column Layout: Activity Calendar & Questionnaire */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8 items-stretch">
        <div className="w-full lg:w-1/2 flex">
          <ActivityCalendarWidget />
        </div>
        <div className="w-full lg:w-1/2 flex">
          <QuestionnaireWidget />
        </div>
      </div>

      {/* Birthdays Grid */}
      <div className="mb-8">
        <BirthdayCards />
      </div>

      {/* Footer */}
      <div className="text-center text-sm font-bold text-gray-400 py-6 border-t border-gray-100 mt-4">
        COPYRIGHT © 2026 FRANCISCAN
      </div>

    </div>
  );
}

export default DashboardContent;
