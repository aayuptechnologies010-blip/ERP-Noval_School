import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import DashboardContent from "./components/DashboardContent";
import AdmissionLayout from "./layouts/AdmissionLayout";
import AdmissionDashboard from "./pages/AdmissionDashboard";
import PlaceholderPage from "./pages/PlaceholderPage";
import Students from "./pages/Students";
import Staff from "./pages/Staff";
import CreateStaff from "./pages/CreateStaff";
import Messages from "./pages/Messages";
import PayrollDashboard from "./pages/PayrollDashboard";
import TransportAttendance from "./pages/TransportAttendance";
import Photos from "./pages/Photos";
import CreateAlbum from "./pages/CreateAlbum";
import EditAlbum from "./pages/EditAlbum";
import BirthdayReport from "./pages/BirthdayReport";
import Report from "./pages/Report";
import AddFavorite from "./pages/AddFavorite";
import StudentsList from "./pages/StudentsList";
import CreateStudent from "./pages/CreateStudent";
import AttendanceSummary from "./pages/AttendanceSummary";
import ClassAttendance from "./pages/ClassAttendance";
import MarkAttendance from "./pages/MarkAttendance";
import ModifyLeave from "./pages/ModifyLeave";
import AbsenteeSMS from "./pages/AbsenteeSMS";
import LeaveRequests from "./pages/LeaveRequests";
import Promotion from "./pages/Promotion";
import ManageRollNumber from "./pages/ManageRollNumber";
import ManageHouse from "./pages/ManageHouse";
import ManagePhoto from "./pages/ManagePhoto";
import ManageClub from "./pages/ManageClub";
import StaffLeave from "./pages/StaffLeave";
import StaffAttendance from "./pages/StaffAttendance";
import ClassTeacher from "./pages/ClassTeacher";
import AssignmentList from "./pages/AssignmentList";
import CreateAssignment from "./pages/CreateAssignment";
import ViewAssignment from "./pages/ViewAssignment";
import TimeTable from "./pages/TimeTable";
import SyllabusList from "./pages/SyllabusList";
import CreateSyllabus from "./pages/CreateSyllabus";
import ComposeMessage from "./pages/ComposeMessage";
import SentMessages from "./pages/SentMessages";
import SpecifiedMessage from "./pages/SpecifiedMessage";
import SchoolAnnouncements from "./pages/SchoolAnnouncements";
import ClassNotice from "./pages/ClassNotice";
import StaffNotice from "./pages/StaffNotice";
import ViewNotice from "./pages/ViewNotice";
import Circulars from "./pages/Circulars";
import CreateCircular from "./pages/CreateCircular";
import SendSMS from "./pages/SendSMS";
import SpecifiedSMS from "./pages/SpecifiedSMS";
import SendCredentials from "./pages/SendCredentials";
import TextToNumber from "./pages/TextToNumber";
import TeacherObservation from "./pages/TeacherObservation";
import ObservationReport from "./pages/ObservationReport";
import MyAttendance from "./pages/MyAttendance";
import MyLeave from "./pages/MyLeave";
import MyPending from "./pages/MyPending";
import MyPayslip from "./pages/MyPayslip";
import Library from "./pages/Library";
import Ebooks from "./pages/Ebooks";
import CalendarPage from "./pages/CalendarPage";
import Activities from "./pages/Activities";
import Questionnaire from "./pages/Questionnaire";
import Thoughts from "./pages/Thoughts";
import Appointment from "./pages/Appointment";
import TaskPage from "./pages/TaskPage";
import DefineAppreciation from "./pages/DefineAppreciation";
import AppreciationRewards from "./pages/AppreciationRewards";
import StudentAppreciation from "./pages/StudentAppreciation";
import StaffAppreciation from "./pages/StaffAppreciation";
import AppreciationReport from "./pages/AppreciationReport";
import DefineInfraction from "./pages/DefineInfraction";
import InfractionConsequences from "./pages/InfractionConsequences";
import StudentInfraction from "./pages/StudentInfraction";
import StaffInfraction from "./pages/StaffInfraction";
import InfractionReport from "./pages/InfractionReport";
import MyInfraction from "./pages/MyInfraction";
import Lesson from "./pages/Lesson";
import AttendanceReport from "./pages/AttendanceReport";
import MissingAttendance from "./pages/MissingAttendance";
import AverageAttendanceAnalysis from "./pages/AverageAttendanceAnalysis";
import TeachersWorkload from "./pages/TeachersWorkload";
import ConversationReport from "./pages/ConversationReport";
import LessonPlanReport from "./pages/LessonPlanReport";
import QuestionPaperReport from "./pages/QuestionPaperReport";
import SMSReport from "./pages/SMSReport";
import SMSConsumption from "./pages/SMSConsumption";
import SMSRechargeLog from "./pages/SMSRechargeLog";
import SMSUses from "./pages/SMSUses";
import AppMessageUses from "./pages/AppMessageUses";
import StatisticalReport from "./pages/StatisticalReport";
import AppUsersReport from "./pages/AppUsersReport";
import SurveyReport from "./pages/SurveyReport";
import UndertakingAcknowledgement from "./pages/UndertakingAcknowledgement";
import ManageSurvey from "./pages/ManageSurvey";
import Survey from "./pages/Survey";
import VideoGallery from "./pages/VideoGallery";
import MediaGallery from "./pages/MediaGallery";
import FeeManagementDashboard from "./pages/FeeManagementDashboard";
import EnterpriseApp from "./EnterpriseApp";
import WebAdminApp from "./pages/WebAdminApp";
import AttendanceDashboard from "./pages/AttendanceDashboard";
import MarksManager from "./pages/MarksManager";
import ManageWing from "./pages/ManageWing";
import ManageCaste from "./pages/ManageCaste";
import ManageReligion from "./pages/ManageReligion";
import ManageCategory from "./pages/ManageCategory";
import ManageSection from "./pages/ManageSection";
import ManageSchoolClass from "./pages/ManageSchoolClass";
import ManageStream from "./pages/ManageStream";
import ManageRemark from "./pages/ManageRemark";
import ManageReason from "./pages/ManageReason";
import ManageSubCaste from "./pages/ManageSubCaste";
import ManageParish from "./pages/ManageParish";
import ManageAcademicYear from "./pages/ManageAcademicYear";
import ManageFinancialYear from "./pages/ManageFinancialYear";
import ManageSchoolBoard from "./pages/ManageSchoolBoard";
import ManageProfession from "./pages/ManageProfession";
import ManageParentsStatus from "./pages/ManageParentsStatus";
import ManageStudentClassification from "./pages/ManageStudentClassification";
import ManageClubMaster from "./pages/ManageClubMaster";
import ManageCommittee from "./pages/ManageCommittee";
import ManageSchoolGlobalDetails from "./pages/ManageSchoolGlobalDetails";
import ManageSchoolGlobalFeeType from "./pages/ManageSchoolGlobalFeeType";
import ManageMeetingDetail from "./pages/ManageMeetingDetail";
import ManageLanguage from "./pages/ManageLanguage";
import ManageTcCaste from "./pages/ManageTcCaste";
import ManageExtraActivity from "./pages/ManageExtraActivity";
import ManageCharacter from "./pages/ManageCharacter";
import ManagePromotionMaster from "./pages/ManagePromotionMaster";
import ManageLastResult from "./pages/ManageLastResult";
import ManageTermMaster from "./pages/ManageTermMaster";
import ManageMoral from "./pages/ManageMoral";
import ManageMotherTongue from "./pages/ManageMotherTongue";
import ManageUpdateAddressBlood from "./pages/ManageUpdateAddressBlood";
import ManageReceiptCertificateSetting from "./pages/ManageReceiptCertificateSetting";
import ManageCertificateRefNoSetting from "./pages/ManageCertificateRefNoSetting";
import ManageAdmissionFormSettings from "./pages/ManageAdmissionFormSettings";
import ManageSaralIdSetting from "./pages/ManageSaralIdSetting";
import ManageStationaryDetails from "./pages/ManageStationaryDetails";
import ManageTcSetting from "./pages/ManageTcSetting";
import ManageImageSetting from "./pages/ManageImageSetting";
import ManageReportLayoutSetting from "./pages/ManageReportLayoutSetting";
import ManageDocumentType from "./pages/ManageDocumentType";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", color: "red", backgroundColor: "#fff", height: "100vh", overflow: "auto" }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error.toString()}</pre>
          <pre>{this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Timetable Module Routes */}
        <Route path="/timetable" element={<TimeTable />} />
        <Route path="/timetable/:tab" element={<TimeTable />} />
        <Route path="/timetable/:tab/:subtab" element={<TimeTable />} />
        <Route path="/timetable-manager" element={<Navigate to="/timetable" replace />} />

        {/* Marks Manager Module Routes */}
        <Route path="/marks" element={<MarksManager />} />
        <Route path="/marks/:tab" element={<MarksManager />} />
        <Route path="/marks/:tab/:subtab" element={<MarksManager />} />
        <Route path="/marks-manager" element={<Navigate to="/marks" replace />} />
        <Route path="/marks-manager/*" element={<Navigate to="/marks" replace />} />

        {/* Attendance Module Routes */}
        <Route path="/attendance" element={<AttendanceDashboard />} />
        <Route
          path="/attendance/define-holiday"
          element={<AttendanceDashboard />}
        />
        <Route
          path="/attendance/define-leave"
          element={<AttendanceDashboard />}
        />
        <Route
          path="/attendance/report-settings"
          element={<AttendanceDashboard />}
        />
        <Route
          path="/attendance/session-transfer"
          element={<AttendanceDashboard />}
        />
        <Route
          path="/attendance/change-academic-year"
          element={<AttendanceDashboard />}
        />
        <Route
          path="/attendance/assign-leave-to-staff"
          element={<AttendanceDashboard />}
        />
        <Route
          path="/attendance/process-attendance-payroll"
          element={<AttendanceDashboard />}
        />
        <Route
          path="/attendance/mark-manual-attendance"
          element={<AttendanceDashboard />}
        />
        <Route
          path="/attendance/leave-marking"
          element={<AttendanceDashboard />}
        />
        <Route
          path="/attendance/late-in-early-out"
          element={<AttendanceDashboard />}
        />
        <Route
          path="/attendance/quick-link"
          element={<AttendanceDashboard />}
        />
        <Route
          path="/attendance/define-shift-master"
          element={<AttendanceDashboard />}
        />

        {/* Admission Module Routes */}
        <Route path="/admission" element={<AdmissionLayout />}>
          <Route index element={<AdmissionDashboard />} />
          
          {/* Master Settings */}
          <Route path="master-settings/language" element={<ManageLanguage />} />
          <Route path="master-settings/tc-caste" element={<ManageTcCaste />} />
          <Route path="master-settings/extra-activity" element={<ManageExtraActivity />} />
          <Route path="master-settings/character" element={<ManageCharacter />} />
          <Route path="master-settings/promotion-master" element={<ManagePromotionMaster />} />
          <Route path="master-settings/last-result" element={<ManageLastResult />} />
          <Route path="master-settings/term-master" element={<ManageTermMaster />} />
          <Route path="master-settings/moral" element={<ManageMoral />} />
          <Route path="master-settings/mother-tongue" element={<ManageMotherTongue />} />
          <Route path="master-settings/update-address-blood" element={<ManageUpdateAddressBlood />} />
          <Route path="master-settings/receipt-certificate-setting" element={<ManageReceiptCertificateSetting />} />
          <Route path="master-settings/certificate-ref-no-setting" element={<ManageCertificateRefNoSetting />} />
          <Route path="master-settings/admission-form-settings" element={<ManageAdmissionFormSettings />} />
          <Route path="master-settings/saral-id-setting" element={<ManageSaralIdSetting />} />
          <Route path="master-settings/stationary-details" element={<ManageStationaryDetails />} />
          <Route path="master-settings/tc-setting" element={<ManageTcSetting />} />
          <Route path="master-settings/image-setting" element={<ManageImageSetting />} />
          <Route path="master-settings/report-layout-setting" element={<ManageReportLayoutSetting />} />
          <Route path="master-settings/document-type" element={<ManageDocumentType />} />

          {/* Global Masters */}
          <Route path="global-masters/profession" element={<ManageProfession />} />
          <Route path="global-masters/academic-year" element={<ManageAcademicYear />} />
          <Route path="global-masters/financial-year" element={<ManageFinancialYear />} />
          <Route path="global-masters/school-global-details" element={<ManageSchoolGlobalDetails />} />
          <Route path="global-masters/school-board" element={<ManageSchoolBoard />} />
          <Route path="global-masters/school-global-fee-type" element={<ManageSchoolGlobalFeeType />} />
          <Route path="global-masters/wing" element={<ManageWing />} />
          <Route path="global-masters/class" element={<ManageSchoolClass />} />
          <Route path="global-masters/section" element={<ManageSection />} />
          <Route path="global-masters/religion" element={<ManageReligion />} />
          <Route path="global-masters/caste" element={<ManageCaste />} />
          <Route path="global-masters/subcaste" element={<ManageSubCaste />} />
          <Route path="global-masters/category" element={<ManageCategory />} />
          <Route path="global-masters/parish" element={<ManageParish />} />
          <Route path="global-masters/house" element={<ManageHouse />} />
          <Route path="global-masters/committee" element={<ManageCommittee />} />
          <Route path="global-masters/meeting-detail" element={<ManageMeetingDetail />} />
          <Route path="global-masters/club" element={<ManageClubMaster />} />
        </Route>

        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="/dashboard/home" replace />} />
          <Route path="home" element={<DashboardContent />} />
          <Route path="profile" element={<Profile />} />
          <Route path="students" element={<StudentsList />} />
          <Route path="students/create" element={<CreateStudent />} />
          <Route path="students/edit/:id" element={<CreateStudent />} />
          <Route path="students/profile/:id?" element={<Students />} />
          <Route
            path="students/attendance/summary"
            element={<AttendanceSummary />}
          />
          <Route
            path="students/attendance/class"
            element={<ClassAttendance />}
          />
          <Route path="students/attendance/mark" element={<MarkAttendance />} />
          <Route
            path="students/attendance/modify-leave"
            element={<ModifyLeave />}
          />
          <Route
            path="students/attendance/absentee-sms"
            element={<AbsenteeSMS />}
          />
          <Route path="students/leave-requests" element={<LeaveRequests />} />
          <Route
            path="students/update-record/promotion"
            element={<Promotion />}
          />
          <Route
            path="students/update-record/roll-number"
            element={<ManageRollNumber />}
          />
          <Route
            path="students/update-record/house"
            element={<ManageHouse />}
          />
          <Route
            path="students/update-record/photo"
            element={<ManagePhoto />}
          />
          <Route path="students/update-record/club" element={<ManageClub />} />
          <Route path="staff" element={<Staff />} />
          <Route path="staff/create" element={<CreateStaff />} />
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
          <Route path="messages/compose" element={<ComposeMessage />} />
          <Route path="messages/sent" element={<SentMessages />} />
          <Route path="messages/specified" element={<SpecifiedMessage />} />
          <Route path="messages" element={<Messages />} />
          <Route
            path="communication/announcements"
            element={<SchoolAnnouncements />}
          />
          <Route path="communication/class-notice" element={<ClassNotice />} />
          <Route path="communication/staff-notice" element={<StaffNotice />} />
          <Route
            path="communication/notice/view/:id"
            element={<ViewNotice />}
          />
          <Route path="communication/circulars" element={<Circulars />} />
          <Route
            path="communication/circulars/create"
            element={<CreateCircular />}
          />
          <Route path="communication/sms/send" element={<SendSMS />} />
          <Route
            path="communication/sms/specified"
            element={<SpecifiedSMS />}
          />
          <Route
            path="communication/sms/credentials"
            element={<SendCredentials />}
          />
          <Route
            path="communication/sms/text-to-number"
            element={<TextToNumber />}
          />
          <Route
            path="teacher/observation"
            element={<TeacherObservation />}
          />
          <Route
            path="teacher/observation-report"
            element={<ObservationReport />}
          />
          <Route
            path="transport/attendance"
            element={<TransportAttendance />}
          />
          <Route path="gallery/photos" element={<Photos />} />
          <Route path="photos" element={<Photos />} />
          <Route path="gallery/photos/create" element={<CreateAlbum />} />
          <Route path="photos/create" element={<CreateAlbum />} />
          <Route path="gallery/photos/edit/:id" element={<EditAlbum />} />
          <Route path="gallery/videos" element={<VideoGallery />} />
          <Route path="gallery/media" element={<MediaGallery />} />
          <Route path="favorite/add" element={<AddFavorite />} />
          <Route path="gallery/favorites" element={<AddFavorite />} />
          <Route path="survey" element={<Survey />} />
          <Route path="survey/manage" element={<ManageSurvey />} />
          <Route path="self/attendance" element={<MyAttendance />} />
          <Route path="self/leave" element={<MyLeave />} />
          <Route path="self/pending" element={<MyPending />} />
          <Route path="self/payslip" element={<MyPayslip />} />
          <Route path="favorite/add" element={<AddFavorite />} />
          <Route path="reports" element={<Report />} />
          <Route path="library" element={<Library />} />
          <Route path="ebooks" element={<Ebooks />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="activities" element={<Activities />} />
          <Route path="questionnaire" element={<Questionnaire />} />
          <Route path="thoughts" element={<Thoughts />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="task" element={<TaskPage />} />
          <Route
            path="discipline/appreciation/define"
            element={<DefineAppreciation />}
          />
          <Route
            path="discipline/appreciation/rewards"
            element={<AppreciationRewards />}
          />
          <Route
            path="discipline/appreciation/student"
            element={<StudentAppreciation />}
          />
          <Route
            path="discipline/appreciation/staff"
            element={<StaffAppreciation />}
          />
          <Route
            path="discipline/appreciation/report"
            element={<AppreciationReport />}
          />
          <Route
            path="discipline/infraction/define"
            element={<DefineInfraction />}
          />
          <Route
            path="discipline/infraction/consequences"
            element={<InfractionConsequences />}
          />
          <Route
            path="discipline/infraction/student"
            element={<StudentInfraction />}
          />
          <Route
            path="discipline/infraction/staff"
            element={<StaffInfraction />}
          />
          <Route
            path="discipline/infraction/report"
            element={<InfractionReport />}
          />
          <Route path="discipline/infraction/my" element={<MyInfraction />} />
          <Route path="lesson" element={<Lesson />} />
          <Route path="report/attendance" element={<AttendanceReport />} />
          <Route
            path="report/missing-attendance"
            element={<MissingAttendance />}
          />
          <Route
            path="report/average-attendance"
            element={<AverageAttendanceAnalysis />}
          />
          <Route
            path="report/teachers-workload"
            element={<TeachersWorkload />}
          />
          <Route path="report/conversation" element={<ConversationReport />} />
          <Route path="report/birthday" element={<BirthdayReport />} />
          <Route path="report/lesson-plan" element={<LessonPlanReport />} />
          <Route
            path="report/question-paper"
            element={<QuestionPaperReport />}
          />
          <Route path="report/sms/report" element={<SMSReport />} />
          <Route path="report/sms/consumption" element={<SMSConsumption />} />
          <Route path="report/sms/recharge" element={<SMSRechargeLog />} />
          <Route path="report/sms/uses" element={<SMSUses />} />
          <Route path="report/app-message" element={<AppMessageUses />} />
          <Route path="report/statistical" element={<StatisticalReport />} />
          <Route path="report/app-users" element={<AppUsersReport />} />
          <Route path="report/survey" element={<SurveyReport />} />
          <Route path="report/undertaking" element={<UndertakingAcknowledgement />} />
          {/* School Masters / Settings Routes */}
          <Route path="settings/wing" element={<ManageWing />} />
          <Route path="settings/caste" element={<ManageCaste />} />
          <Route path="settings/religion" element={<ManageReligion />} />
          <Route path="settings/category" element={<ManageCategory />} />
          <Route path="settings/section" element={<ManageSection />} />
          <Route path="settings/class" element={<ManageSchoolClass />} />
          <Route path="settings/stream" element={<ManageStream />} />
          <Route path="settings/remark" element={<ManageRemark />} />
          <Route path="settings/reason" element={<ManageReason />} />
          <Route path="settings/subcaste" element={<ManageSubCaste />} />
          <Route path="settings/parish" element={<ManageParish />} />
          <Route path="settings/academic-year" element={<ManageAcademicYear />} />
          <Route path="settings/financial-year" element={<ManageFinancialYear />} />
          <Route path="settings/board" element={<ManageSchoolBoard />} />
          <Route path="settings/profession" element={<ManageProfession />} />
          <Route path="settings/parents-status" element={<ManageParentsStatus />} />
          <Route path="settings/classification" element={<ManageStudentClassification />} />
          <Route path="settings/club" element={<ManageClubMaster />} />
          <Route path="settings/committee" element={<ManageCommittee />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>

        {/* Fee Management Module */}
        <Route path="/fee" element={<FeeManagementDashboard />} />
        <Route path="/enterprise-fee" element={<EnterpriseApp />} />
        <Route path="/webadmin" element={<WebAdminApp />} />
        <Route path="/webadmin/*" element={<WebAdminApp />} />
        <Route path="/web-admin" element={<WebAdminApp />} />
        <Route path="/web-admin/*" element={<WebAdminApp />} />
        
        {/* Payroll Module */}
        <Route path="/payroll" element={<ErrorBoundary><PayrollDashboard /></ErrorBoundary>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
