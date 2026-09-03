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
  const [stats, setStats] = React.useState({
    totalStudents: 0, boysCount: 0, girlsCount: 0,
    totalStaff: 0, maleStaff: 0, femaleStaff: 0,
    newAdmissions: 0,
    studentsPendingLeave: 0, staffPendingLeave: 0,
    newMessages: 0, newNotices: 0, newCirculars: 0,
    questionnaires: 0, thoughts: 0,
    myAttendancePercent: '0%',
    newStaff: 0, studentsInInfirmary: 0, workload: 0,
    usersPhotoRequest: 0, iCardPhotoRequest: 0,
    staffProfileRequest: 0, approvalRequest: 0, studentProfileRequest: 0
  });

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/dashboard/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const getPercentage = (count, total) => total > 0 ? Math.round((count / total) * 100) : 0;

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
          title="Total Students" mainValue={stats.totalStudents.toString()}
          subStats={[
            { label: `Girls ${stats.girlsCount} (${getPercentage(stats.girlsCount, stats.totalStudents)}%)`, percentage: `${getPercentage(stats.girlsCount, stats.totalStudents)}%`, barColor: 'bg-blue-500' },
            { label: `Boys ${stats.boysCount} (${getPercentage(stats.boysCount, stats.totalStudents)}%)`, percentage: `${getPercentage(stats.boysCount, stats.totalStudents)}%`, barColor: 'bg-blue-500' }
          ]} showVisit={false}
        />
        <DashboardCard 
          icon={FaUserTie} iconBgColor="bg-green-100" iconColor="text-green-500"
          title="Total Staff" mainValue={stats.totalStaff.toString()}
          subStats={[
            { label: `Female ${stats.femaleStaff} (${getPercentage(stats.femaleStaff, stats.totalStaff)}%)`, percentage: `${getPercentage(stats.femaleStaff, stats.totalStaff)}%`, barColor: 'bg-blue-500' },
            { label: `Male ${stats.maleStaff} (${getPercentage(stats.maleStaff, stats.totalStaff)}%)`, percentage: `${getPercentage(stats.maleStaff, stats.totalStaff)}%`, barColor: 'bg-blue-500' }
          ]} showVisit={false}
        />
        <DashboardCard 
          icon={FaChartLine} iconBgColor="bg-red-100" iconColor="text-red-400"
          title="Progress Stats"
          subStats={[
            { label: `New Admission ${stats.newAdmissions}/${stats.totalStudents}`, percentage: `${getPercentage(stats.newAdmissions, stats.totalStudents)}%`, barColor: 'bg-orange-400' },
            { label: `New Staff ${stats.newStaff}/${stats.totalStaff}`, percentage: `${getPercentage(stats.newStaff, stats.totalStaff)}%`, barColor: 'bg-orange-400' }
          ]} showVisit={false}
        />
        <DashboardCard 
          icon={FaWalking} iconBgColor="bg-orange-100" iconColor="text-orange-400"
          title="Students' Pending Leave" mainValue={stats.studentsPendingLeave.toString()}
        />
        
        <DashboardCard 
          icon={FaSuitcase} iconBgColor="bg-yellow-100" iconColor="text-yellow-500"
          title="Staff's Pending Leave" mainValue={stats.staffPendingLeave.toString()}
        />
        <DashboardCard 
          icon={FaEnvelope} iconBgColor="bg-green-100" iconColor="text-green-500"
          title="New Messages" mainValue={stats.newMessages.toString()}
        />
        <DashboardCard 
          icon={FaBell} iconBgColor="bg-green-100" iconColor="text-green-500"
          title="New Notices" mainValue={stats.newNotices.toString()}
        />
        <DashboardCard 
          icon={FaSync} iconBgColor="bg-teal-100" iconColor="text-teal-500"
          title="New Circulars" mainValue={stats.newCirculars.toString()}
        />

        <DashboardCard 
          icon={FaUserCheck} iconBgColor="bg-orange-100" iconColor="text-orange-400"
          title="My Attendance" mainValue={stats.myAttendancePercent}
        />
        <DashboardCard 
          icon={FaHospital} iconBgColor="bg-pink-100" iconColor="text-pink-500"
          title="Students In Infirmary" mainValue={stats.studentsInInfirmary.toString()}
        />
        <DashboardCard 
          icon={FaBriefcase} iconBgColor="bg-purple-100" iconColor="text-purple-500"
          title="Workload" mainValue={stats.workload.toString()}
        />
        <DashboardCard 
          icon={FaUserPlus} iconBgColor="bg-indigo-100" iconColor="text-indigo-500"
          title="New Student(s)" mainValue={stats.newAdmissions.toString()} showVisit={false}
        />

        <DashboardCard 
          icon={FaCamera} iconBgColor="bg-blue-100" iconColor="text-blue-500"
          title="User's Photo Request" mainValue={stats.usersPhotoRequest.toString()}
        />
        <DashboardCard 
          icon={FaQuestionCircle} iconBgColor="bg-teal-100" iconColor="text-teal-400"
          title="Questionnaire" mainValue={stats.questionnaires.toString()}
        />
        <DashboardCard 
          icon={FaLightbulb} iconBgColor="bg-red-100" iconColor="text-red-400"
          title="Thoughts" mainValue={stats.thoughts.toString()}
        />
        <DashboardCard 
          icon={FaIdCard} iconBgColor="bg-orange-100" iconColor="text-orange-600"
          title="I-Card Photo Request" mainValue={stats.iCardPhotoRequest.toString()}
        />
        
        <DashboardCard 
          icon={FaUserTie} iconBgColor="bg-green-400" iconColor="text-white"
          title="Staff Profile Request" mainValue={stats.staffProfileRequest.toString()}
        />
        <DashboardCard 
          icon={FaFileAlt} iconBgColor="bg-purple-400" iconColor="text-white"
          title="Approval Request" mainValue={stats.approvalRequest.toString()}
        />
        <DashboardCard 
          icon={FaUserGraduate} iconBgColor="bg-green-400" iconColor="text-white"
          title="Student Profile Request" mainValue={stats.studentProfileRequest.toString()}
        />

      </div>

      {/* Main Chart */}
      <EstimatedCollectionChart data={stats.estimatedCollection} />

      {/* Daily Mode Wise Collection */}
      <DailyCollection data={stats.dailyCollection} />

      {/* Two Column Layout: Fee Defaulter & Bank Balance */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8 items-stretch">
        <div className="w-full lg:w-2/3 flex">
          <FeeDefaulter data={stats.feeDefaulters} summary={stats.feeDefaulterSummary} />
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
          <AdmissionStats data={stats.admissionStats} />
        </div>
      </div>

      {/* Two Column Layout: Standard Stats & Admission Type */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8 items-stretch">
        <div className="w-full lg:w-1/2 flex">
          <StandardStats data={stats.standardStats} />
        </div>
        <div className="w-full lg:w-1/2 flex">
          <AdmissionTypeStats data={stats.admissionTypeStats} />
        </div>
      </div>

      {/* Two Column Layout: Library Fine Status & Student Statistic */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8 items-stretch">
        <div className="w-full lg:w-1/2 flex">
          <LibraryFineStatus />
        </div>
        <div className="w-full lg:w-1/2 flex">
          <StudentStatistic data={stats.studentStatistic} />
        </div>
      </div>

      {/* Two Column Layout: Library Book Status & Feed */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8 items-stretch">
        <div className="w-full lg:w-1/2 flex">
          <LibraryBookStatus />
        </div>
        <div className="w-full lg:w-1/2 flex">
          <Feed data={stats.feedItems} />
        </div>
      </div>

      {/* Two Column Layout: Activity Calendar & Questionnaire */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8 items-stretch">
        <div className="w-full lg:w-1/2 flex">
          <ActivityCalendarWidget data={stats.activityDates} />
        </div>
        <div className="w-full lg:w-1/2 flex">
          <QuestionnaireWidget data={stats.questionnaireList} />
        </div>
      </div>

      {/* Birthdays Grid */}
      <div className="mb-8">
        <BirthdayCards data={stats.birthdayCards} />
      </div>

      {/* Footer */}
      <div className="text-center text-sm font-bold text-gray-400 py-6 border-t border-gray-100 mt-4">
        COPYRIGHT © 2026 FRANCISCAN
      </div>

    </div>
  );
}

export default DashboardContent;
