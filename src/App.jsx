import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DashboardContent from './components/DashboardContent';
import PlaceholderPage from './pages/PlaceholderPage';
import Students from './pages/Students';
import Staff from './pages/Staff';
import Messages from './pages/Messages';
import TransportAttendance from './pages/TransportAttendance';
import Photos from './pages/Photos';
import BirthdayReport from './pages/BirthdayReport';
import Report from './pages/Report';
import AddFavorite from './pages/AddFavorite';
import StudentsList from './pages/StudentsList';
import AttendanceSummary from './pages/AttendanceSummary';
import ClassAttendance from './pages/ClassAttendance';
import MarkAttendance from './pages/MarkAttendance';
import ModifyLeave from './pages/ModifyLeave';
import AbsenteeSMS from './pages/AbsenteeSMS';
import LeaveRequests from './pages/LeaveRequests';
import Promotion from './pages/Promotion';
import ManageRollNumber from './pages/ManageRollNumber';
import ManageHouse from './pages/ManageHouse';
import ManagePhoto from './pages/ManagePhoto';
import ManageClub from './pages/ManageClub';
import StaffLeave from './pages/StaffLeave';
import StaffAttendance from './pages/StaffAttendance';
import ClassTeacher from './pages/ClassTeacher';
import AssignmentList from './pages/AssignmentList';
import CreateAssignment from './pages/CreateAssignment';
import ViewAssignment from './pages/ViewAssignment';
import TimeTable from './pages/TimeTable';
import SyllabusList from './pages/SyllabusList';
import CreateSyllabus from './pages/CreateSyllabus';
import ComposeMessage from './pages/ComposeMessage';
import SentMessages from './pages/SentMessages';
import SpecifiedMessage from './pages/SpecifiedMessage';
import SchoolAnnouncements from './pages/SchoolAnnouncements';
import ClassNotice from './pages/ClassNotice';
import StaffNotice from './pages/StaffNotice';
import ViewNotice from './pages/ViewNotice';
import Circulars from './pages/Circulars';
import CreateCircular from './pages/CreateCircular';
import SendSMS from './pages/SendSMS';
import SpecifiedSMS from './pages/SpecifiedSMS';
import SendCredentials from './pages/SendCredentials';
import TextToNumber from './pages/TextToNumber';
import TeacherObservation from './pages/TeacherObservation';
import ObservationReport from './pages/ObservationReport';
import MyAttendance from './pages/MyAttendance';
import MyLeave from './pages/MyLeave';
import MyPending from './pages/MyPending';
import MyPayslip from './pages/MyPayslip';
import Library from './pages/Library';
import Ebooks from './pages/Ebooks';
import CalendarPage from './pages/CalendarPage';
import Activities from './pages/Activities';
import Questionnaire from './pages/Questionnaire';
import Thoughts from './pages/Thoughts';
import Appointment from './pages/Appointment';
import TaskPage from './pages/TaskPage';
import DefineAppreciation from './pages/DefineAppreciation';
import AppreciationRewards from './pages/AppreciationRewards';
import StudentAppreciation from './pages/StudentAppreciation';
import StaffAppreciation from './pages/StaffAppreciation';
import AppreciationReport from './pages/AppreciationReport';
import DefineInfraction from './pages/DefineInfraction';
import InfractionConsequences from './pages/InfractionConsequences';
import StudentInfraction from './pages/StudentInfraction';
import StaffInfraction from './pages/StaffInfraction';
import InfractionReport from './pages/InfractionReport';
import MyInfraction from './pages/MyInfraction';
import Lesson from './pages/Lesson';
import AttendanceReport from './pages/AttendanceReport';
import MissingAttendance from './pages/MissingAttendance';
import AverageAttendanceAnalysis from './pages/AverageAttendanceAnalysis';
import TeachersWorkload from './pages/TeachersWorkload';
import ConversationReport from './pages/ConversationReport';
import LessonPlanReport from './pages/LessonPlanReport';
import QuestionPaperReport from './pages/QuestionPaperReport';
import SMSReport from './pages/SMSReport';
import SMSConsumption from './pages/SMSConsumption';
import SMSRechargeLog from './pages/SMSRechargeLog';
import SMSUses from './pages/SMSUses';
import AppMessageUses from './pages/AppMessageUses';
import StatisticalReport from './pages/StatisticalReport';
import AppUsersReport from './pages/AppUsersReport';
import SurveyReport from './pages/SurveyReport';
import ManageSurvey from './pages/ManageSurvey';
import Survey from './pages/Survey';
import VideoGallery from './pages/VideoGallery';
import MediaGallery from './pages/MediaGallery';
function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="/dashboard/home" replace />} />
          <Route path="home" element={<DashboardContent />} />
          <Route path="students" element={<StudentsList />} />
          <Route path="students/profile" element={<Students />} />
          <Route path="students/attendance/summary" element={<AttendanceSummary />} />
          <Route path="students/attendance/class" element={<ClassAttendance />} />
          <Route path="students/attendance/mark" element={<MarkAttendance />} />
          <Route path="students/attendance/modify-leave" element={<ModifyLeave />} />
          <Route path="students/attendance/absentee-sms" element={<AbsenteeSMS />} />
          <Route path="students/leave-requests" element={<LeaveRequests />} />
          <Route path="students/update-record/promotion" element={<Promotion />} />
          <Route path="students/update-record/roll-number" element={<ManageRollNumber />} />
          <Route path="students/update-record/house" element={<ManageHouse />} />
          <Route path="students/update-record/photo" element={<ManagePhoto />} />
          <Route path="students/update-record/club" element={<ManageClub />} />
          <Route path="staff" element={<Staff />} />
          <Route path="staff/profile" element={<Staff />} />
          <Route path="staff/leave" element={<StaffLeave />} />
          <Route path="staff/attendance" element={<StaffAttendance />} />
          <Route path="staff/class-teacher" element={<ClassTeacher />} />
          <Route path="assignment" element={<AssignmentList />} />
          <Route path="assignment/create" element={<CreateAssignment />} />
          <Route path="assignment/view" element={<ViewAssignment />} />
          <Route path="timetable" element={<TimeTable />} />
          <Route path="syllabus" element={<SyllabusList />} />
          <Route path="syllabus/create" element={<CreateSyllabus />} />
          <Route path="message" element={<Messages />} />
          <Route path="message/inbox" element={<Messages />} />
          <Route path="message/compose" element={<ComposeMessage />} />
          <Route path="message/sent" element={<SentMessages />} />
          <Route path="message/specified" element={<SpecifiedMessage />} />
          <Route path="announcement/school" element={<SchoolAnnouncements />} />
          <Route path="announcement/class" element={<ClassNotice />} />
          <Route path="announcement/class/view/:id" element={<ViewNotice />} />
          <Route path="announcement/staff" element={<StaffNotice />} />
          <Route path="announcement/staff/view/:id" element={<ViewNotice />} />
          <Route path="announcement/circular" element={<Circulars />} />
          <Route path="announcement/create-circular" element={<CreateCircular />} />
          <Route path="sms/send" element={<SendSMS />} />
          <Route path="sms/specified" element={<SpecifiedSMS />} />
          <Route path="sms/credentials" element={<SendCredentials />} />
          <Route path="sms/text" element={<TextToNumber />} />
          <Route path="observation/entry" element={<TeacherObservation />} />
          <Route path="observation/report" element={<ObservationReport />} />
          <Route path="myinfo/attendance" element={<MyAttendance />} />
          <Route path="myinfo/leave" element={<MyLeave />} />
          <Route path="myinfo/pending" element={<MyPending />} />
          <Route path="myinfo/payslip" element={<MyPayslip />} />
          <Route path="library" element={<Library />} />
          <Route path="favorites/transport" element={<TransportAttendance />} />
          <Route path="favorites/students" element={<Students />} />
          <Route path="favorites/staff" element={<Staff />} />
          <Route path="favorites/photos" element={<Photos />} />
          <Route path="favorites/birthday" element={<BirthdayReport />} />
          <Route path="favorites/report" element={<Report />} />
          <Route path="favorites/add" element={<AddFavorite />} />
          <Route path="transport" element={<TransportAttendance />} />
          <Route path="report/undertaking" element={<Report />} />
          <Route path="managesurvey" element={<ManageSurvey />} />
          <Route path="survey" element={<Survey />} />
          <Route path="gallery/photos" element={<Photos />} />
          <Route path="gallery/videos" element={<VideoGallery />} />
          <Route path="gallery/favorites" element={<AddFavorite />} />
          <Route path="gallery/media" element={<MediaGallery />} />
          <Route path="ebooks" element={<Ebooks />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="activities" element={<Activities />} />
          <Route path="questionnaire" element={<Questionnaire />} />
          <Route path="thoughts" element={<Thoughts />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="task" element={<TaskPage />} />
          <Route path="discipline/appreciation/define" element={<DefineAppreciation />} />
          <Route path="discipline/appreciation/rewards" element={<AppreciationRewards />} />
          <Route path="discipline/appreciation/student" element={<StudentAppreciation />} />
          <Route path="discipline/appreciation/staff" element={<StaffAppreciation />} />
          <Route path="discipline/appreciation/report" element={<AppreciationReport />} />
          <Route path="discipline/infraction/define" element={<DefineInfraction />} />
          <Route path="discipline/infraction/consequences" element={<InfractionConsequences />} />
          <Route path="discipline/infraction/student" element={<StudentInfraction />} />
          <Route path="discipline/infraction/staff" element={<StaffInfraction />} />
          <Route path="discipline/infraction/report" element={<InfractionReport />} />
          <Route path="discipline/infraction/my" element={<MyInfraction />} />
          <Route path="lesson" element={<Lesson />} />
          <Route path="report/attendance" element={<AttendanceReport />} />
          <Route path="report/missing-attendance" element={<MissingAttendance />} />
          <Route path="report/average-attendance" element={<AverageAttendanceAnalysis />} />
          <Route path="report/teachers-workload" element={<TeachersWorkload />} />
          <Route path="report/conversation" element={<ConversationReport />} />
          <Route path="report/birthday" element={<BirthdayReport />} />
          <Route path="report/lesson-plan" element={<LessonPlanReport />} />
          <Route path="report/question-paper" element={<QuestionPaperReport />} />
          <Route path="report/sms/report" element={<SMSReport />} />
          <Route path="report/sms/consumption" element={<SMSConsumption />} />
          <Route path="report/sms/recharge" element={<SMSRechargeLog />} />
          <Route path="report/sms/uses" element={<SMSUses />} />
          <Route path="report/app-message" element={<AppMessageUses />} />
          <Route path="report/statistical" element={<StatisticalReport />} />
          <Route path="report/app-users" element={<AppUsersReport />} />
          <Route path="report/survey" element={<SurveyReport />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
