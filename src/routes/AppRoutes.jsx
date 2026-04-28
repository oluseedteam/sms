import React from 'react'
import { Routes, Route } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';

//auth
import Login from '../pages/auth/Login'

// Homepage 
import Home from '../pages/public/home/Home';
import About from '../pages/public/about/About';
import Media from '../pages/public/media/Media'
import Contact from '../pages/public/contact/Contact'

// ── Student Dashboard ────────────────────────────────────────
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/student/dashboard/Dashboard';
import MyClassPage from '../pages/student/Classes/MyClassPage';
import HomeworkPage from '../pages/student/Homework/HomeworkPage';
import GradesPage from '../pages/student/Grades/GradesPage';
import HomeworkDetail from '../pages/student/Homework/HomeworkDetail';
import Homework from '../pages/student/Homework/Homework';
import AttendancePage from '../pages/student/Attendance/AttendancePage';
import MessagesPage from '../pages/student/Messages/MessagesPage';
import ProfilePage from '../pages/student/Profile/ProfilePage';

// ── Teacher Dashboard ────────────────────────────────────────
import TeacherLayout from '../layouts/TeacherLayout';
import TeacherDashboardPage    from '../pages/teacher/TeacherDashboard/TeacherDashboardPage';
import TeacherMyClassesPage    from '../pages/teacher/TeacherMyClasses/TeacherMyClassesPage';
import TeacherStudentsPage     from '../pages/teacher/TeacherStudents/TeacherStudentsPage';
import TeacherAssignmentsPage  from '../pages/teacher/TeacherAssignments/TeacherAssignmentsPage';
import TeacherGradebookPage    from '../pages/teacher/TeacherGradebook/TeacherGradebookPage';
import TeacherAttendancePage   from '../pages/teacher/TeacherAttendance/TeacherAttendancePage';
import TeacherMessagesPage     from '../pages/teacher/TeacherMessages/TeacherMessagesPage';
import TeacherCalendarPage     from '../pages/teacher/TeacherCalendar/TeacherCalendarPage';
import TeacherResourcesPage    from '../pages/teacher/TeacherResources/TeacherResourcesPage';
import TeacherAttendacesecondPage from '../pages/teacher/TeacherAttendacesecond/TeacherAttendacesecondPage';
import TeacherCalendarsecondPage from '../pages/teacher/TeacherCalendarsecond/TeacherCalendarsecondPage';

// ── Admin Dashboard ────────────────────────────────────────
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboardPage from '../pages/Admin/dashboard/AdminDashboardPage';
import UserManagementPage from '../pages/Admin/dashboard/UserManagementPage';
import AdminLogsPage from '../pages/Admin/dashboard/AdminLogsPage';
import AcademicManagementPage from '../pages/Admin/dashboard/AcademicManagementPage';
import AdminProfilePage from '../pages/Admin/dashboard/AdminProfilePage';
import ForgotPassword from '../pages/auth/ForgotPassword';
import NotFound from '../pages/public/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path='/media' element={<Media />} />
      </Route>

      {/* Auth */}
      <Route path='/login' element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />

      {/* Student dashboard */}
      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        <Route path='/student' element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='my-classes' element={<MyClassPage />} />
          <Route path='students' element={<TeacherStudentsPage />} />
          <Route path='grade' element={<GradesPage />} />
          <Route path='homework' element={<HomeworkPage />}>
            <Route index element={<Homework />} />
            <Route path='detail' element={<HomeworkDetail />} />
          </Route>
          <Route path='attendance' element={<AttendancePage />} />
          <Route path='message' element={<MessagesPage />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='library' element={<AdminDashboardPage />} />
        </Route>
      </Route>

      {/* Teacher dashboard */}
      <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
        <Route path='/teacher' element={<TeacherLayout />}>
        <Route index element={<TeacherDashboardPage />} />
        <Route path='my-classes'   element={<TeacherMyClassesPage />} />
        <Route path='students'     element={<TeacherStudentsPage />} />
        <Route path='assignments'  element={<TeacherAssignmentsPage />} />
        <Route path='gradebook'    element={<TeacherGradebookPage />} />
        <Route path='attendance'   element={<TeacherAttendancePage />} />
        <Route path='attendance-second' element={<TeacherAttendacesecondPage />} />
        <Route path='messages'     element={<TeacherMessagesPage />} />
        <Route path='calendar'     element={<TeacherCalendarPage />} />
        <Route path='calendar-second' element={<TeacherCalendarsecondPage />} />
          <Route path='resources'    element={<TeacherResourcesPage />} />
          <Route path='profile'      element={<ProfilePage />} />
        </Route>
      </Route>
      
      {/* Admin Dashboard */}
      <Route element={<ProtectedRoute blockedRoles={['student', 'teacher']} />}>
        <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path='profile' element={<AdminProfilePage />} />
        <Route path='users' element={<UserManagementPage />} />
        <Route path='logs' element={<AdminLogsPage />} />
        <Route path='student' element={<UserManagementPage defaultRole="student" />} />
        <Route path='worker' element={<UserManagementPage defaultRole="worker" />} />
        <Route path='academics' element={<AcademicManagementPage />} />
        {/* Placeholders for other admin pages */}
        <Route path='financial' element={<div className="p-10 text-xl font-bold text-gray-500">Financial Reports coming soon...</div>} />
        <Route path='notifications' element={<div className="p-10 text-xl font-bold text-gray-500">Notification Management coming soon...</div>} />
          <Route path='settings' element={<div className="p-10 text-xl font-bold text-gray-500">System Settings coming soon...</div>} />
          <Route path='dispute' element={<div className="p-10 text-xl font-bold text-gray-500">Disputes & Feedback coming soon...</div>} />
        </Route>
      </Route>

      {/* Catch all */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes