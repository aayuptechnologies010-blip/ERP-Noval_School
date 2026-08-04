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
          <Route path="favorites/transport" element={<TransportAttendance />} />
          <Route path="favorites/students" element={<Students />} />
          <Route path="favorites/staff" element={<Staff />} />
          <Route path="favorites/photos" element={<Photos />} />
          <Route path="favorites/birthday" element={<BirthdayReport />} />
          <Route path="favorites/report" element={<Report />} />
          <Route path="favorites/add" element={<AddFavorite />} />
          <Route path="transport" element={<TransportAttendance />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
